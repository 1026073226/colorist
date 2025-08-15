// 魔法书右键射线攻击逻辑（基于KubeJS事件文档）
ItemEvents.rightClicked((event) => {

	const { server, player, item } = event;
	// 提取魔法书颜色属性
	const attrs = global.CALC_ATTRS(item.nbt.attrs || []);
	const value = global.VALUE_COUNTER(attrs);
	let cost = value.cost;
	if (item.id !== global.FULL("magic_book")) return;
	if (player.persistentData.usingMagic) return; // 防止重复使用
	if (global.KEEP(attrs.level) < cost) {
		player.tell(Text.red("等级不足"));
		return;
	}
	global.ATTR_ADDER(item.nbt.attrs[0], "level", -cost);
	// 设置使用标记
	player.persistentData.usingMagic = true;
	player.persistentData.magicStartTime = player.level.getTime();

	// 通知客户端生成粒子
	player.sendData("colorist:magic_start", {
		r: attrs.r / 10, // 属性值是0-10范围，需转换为0-1
		g: attrs.g / 10,
		b: attrs.b / 10,
	});
  event.cancel();

});

ServerEvents.tick((event) => {
	const { server } = event;
	const level = server.overworld(); // 通过server获取主世界
	const players = server.getPlayers(); // 通过server获取玩家列表

	players.forEach((player) => {
		if (!player.persistentData.usingMagic) return;

		// 最长施法时间3秒
		if (level.getTime() - player.persistentData.magicStartTime > 30) {
			player.persistentData.usingMagic = false;
			player.sendData("colorist:magic_stop", {});
			return;
		}

		// 使用玩家射线检测（10格射程）
		const rayTrace = player.rayTrace(10);

		// 命中实体时应用伤害
		if (rayTrace && rayTrace.entity) {
			const target = rayTrace.entity;
			const item = player.getMainHandItem();

			// 计算属性伤害
			const attrs = global.CALC_ATTRS(item.nbt.attrs);
			const damageValues = global.VALUE_COUNTER(attrs);

			// 应用伤害（基础攻击+暴击计算）
			let damage = damageValues.atk;
			if (Math.random() < damageValues.br) {
				damage *= damageValues.bd;
				player.tell(Text.gold("暴击!"));
			}

			target.attack(player.damageSources().playerAttack(player), damage);
			player.persistentData.usingMagic = false;
			player.sendData("colorist:magic_stop", {});
		}
	});
});
