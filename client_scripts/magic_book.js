let isCasting = false;
let magicColor = [1, 1, 1, 1]; // 默认白色

// 监听施法开始事件
NetworkEvents.dataReceived("colorist:magic_start", (e) => {
	isCasting = true;
	magicColor = [e.data.r || 1, e.data.g || 1, e.data.b || 1, 1.0];
});

// 监听施法结束事件
NetworkEvents.dataReceived("colorist:magic_stop", (e) => {
	isCasting = false;
});

// 每tick生成粒子
ClientEvents.tick((event) => {
	const client  = event;
	if (!isCasting || !client.player) return;

	const player = client.player;
	const eyePos = player.getEyePosition(1.0);
	const lookVec = player.getLookAngle().scale(10); // 10格射程

	// 生成粒子轨迹
	for (let i = 0; i < 5; i++) {
		const progress = Math.random();
		const particlePos = eyePos.add(lookVec.scale(progress));
		client.level.addParticle(
			"minecraft:flame",
			particlePos.x(),
			particlePos.y(),
			particlePos.z(),
			0,
			0,
			0,
		);
	}
});
