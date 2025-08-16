// priority: 999
global.MAGIC_TABLE = (e, s) => {
	const player = e.getPlayer();
	const block = e.getBlock();
	const data = block.getEntityData().get("data");
	const world = player.getLevel();
	const item = player.getMainHandItem();

	function loot() {
		global.FIND_FLOAT_ITEM(world, block).kill();
		let t = Item.of(data.get("item"), data.get("nbt"));
		player.give(t);
		block.setEntityData({
			data: { item: "minecraft:air", nbt: {} }
		});
	}

	function place() {
		global.FLOAT_ITEM(world, item, block);
		global.REMOVE_ITEM(item);
	}

	if (s == "broken") {
		loot();
		return;
	}

	if (
		!player.isShiftKeyDown() &&
		global.FOMMAT(data.get("item")) != "minecraft:air" &&
		global.FOMMAT(item.id) != "air"
	) {
		if (global.FOMMAT(data.get("item")) == global.FULL("magic_paper")) {
			let icolor = global.COLOR[global.FOMMAT(item.id)];
			if (icolor) {
				global.REMOVE_ITEM(item);
				global.ATTR_ADDER(data.nbt, "level", 1);
				data.nbt.level = global.KEEP(data.nbt.level);
				data.nbt.attr = global.MERGE_COLOR(
					data.nbt.attr,
					icolor,
					1 / data.nbt.level
				);
				block.setEntityData({
					data: data
				});
				player.tell(Text.of("染色成功").color(data.nbt.attr));
			} else if (item.id == global.FULL("magic_crystal")) {
				global.REMOVE_ITEM(item);
				data.nbt.level += 5;
				block.setEntityData({
					data: data
				});
				player.tell("添加成功");
			} else {
				player.tell("该物品不可用于染色");
			}
		} else if (
			global.FOMMAT(data.get("item")) == global.FULL("magic_book")
		) {
			if (item.id == global.FULL("magic_paper")) {
				let addAttrs = global.CALC_ATTR(item.nbt);
				let attrs = data.get("nbt").attrs || [];
				if (attrs.length >= global.MAX_ATTRS) {
					player.tell(
						`(${global.MAX_ATTRS}/${global.MAX_ATTRS})塞不下更多了`
					);
				} else {
					attrs.push(addAttrs);
					data.nbt.attrs = attrs;
					if (attrs.length == 1) {
						data.nbt.attr = addAttrs;
					} else {
						data.nbt.attr = global.CALC_ATTRS(attrs);
					}
					block.setEntityData({
						data: data
					});
					global.REMOVE_ITEM(item);
					player.tell(
						`(${attrs.length}/${global.MAX_ATTRS})添加成功`
					);
				}
			} else if (item.id == global.FULL("magic_crystal")) {
				if (data.nbt.attrs.length == 0) {
					player.tell("书中没有属性，无法添加术晶");
					return;
				}
				global.REMOVE_ITEM(item);
				data.nbt.attrs[0].level += 5;
				block.setEntityData({
					data: data
				});
				player.tell("添加成功");
			} else {
				player.tell("该物品无法夹入书中");
			}
		} else {
			player.tell("该物品不可染色");
		}
		return;
	}
	if (data.get("item") == "minecraft:air") {
		place();
	} else {
		loot();
	}
};
