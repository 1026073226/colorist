let isCasting = false;
let magicColor = [1, 1, 1, 1]; // 默认白色
let isPlayed = false;
let oneshot = false;
let progress = 0;

// 监听施法开始事件
NetworkEvents.dataReceived("colorist:magic_start", e => {
	isCasting = true;
	magicColor = [e.data.r || 1, e.data.g || 1, e.data.b || 1, 1.0];
	progress = 0;
});

// 监听施法结束事件
NetworkEvents.dataReceived("colorist:magic_stop", e => {
	isCasting = false;
	oneshot = false;
});

NetworkEvents.dataReceived("colorist:crit", event => {
  const client = event;
	if (!isCasting || !client.player) return;
	const player = client.player;
	const eyePos = player.getEyePosition(1.0);
	const c = event.data.crit;
	client.level.playLocalSound(
		eyePos.x(),
		eyePos.y(),
		eyePos.z(),
		c ? "minecraft:entity.lightning_bolt.impact" : "minecraft:block.amethyst_block.break",
		"master",
		0.8,
		1.4 + Math.random(),
		true
	);
});

// 每tick生成粒子
ClientEvents.tick(event => {
	const client = event;
	if (!isCasting || !client.player) return;
	const player = client.player;
	const eyePos = player.getEyePosition(1.0);
	const lookVec = player.getLookAngle().scale(10); // 10格射程
	if (!isPlayed) {
		client.level.playLocalSound(
			eyePos.x(),
			eyePos.y(),
			eyePos.z(),
			"minecraft:block.amethyst_block.hit",
			"master",
			1,
			1 + Math.random(),
			true
		);
		isPlayed = true;
	} else {
		isPlayed = false;
	}
	if (!oneshot) {
	  client.level.playLocalSound(
			eyePos.x(),
			eyePos.y(),
			eyePos.z(),
			"minecraft:entity.warden.death",
			"master",
			0.6,
			1.5 + Math.random(),
			true
		);
		oneshot = true;
	}
	// 生成粒子轨迹
	progress += Math.random() / 50 + 0.05;
	if(progress > 1) return;
	const particlePos = eyePos.add(lookVec.scale(progress));
	client.level.addParticle(
		"minecraft:dripping_obsidian_tear",
		particlePos.x(),
		particlePos.y(),
		particlePos.z(),
		0,
		0,
		0
	);
	client.level.addParticle(
		"minecraft:electric_spark",
		particlePos.x(),
		particlePos.y(),
		particlePos.z(),
		0,
		0,
		0
	);
	client.level.addParticle(
		"minecraft:enchant",
		particlePos.x(),
		particlePos.y(),
		particlePos.z(),
		0,
		0,
		0
	);
	if (!isPlayed) {
		client.level.addParticle(
			"minecraft:sonic_boom",
			particlePos.x(),
			particlePos.y(),
			particlePos.z(),
			0,
			0,
			0
		);
		client.level.addParticle(
			"minecraft:dripping_dripstone_lava",
			particlePos.x(),
			particlePos.y(),
			particlePos.z(),
			0,
			0,
			0
		);
	} else {
		client.level.addParticle(
			"minecraft:dripping_dripstone_water",
			particlePos.x(),
			particlePos.y(),
			particlePos.z(),
			0,
			0,
			0
		);
	}
});
