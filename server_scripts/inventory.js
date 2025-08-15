PlayerEvents.inventoryChanged((event) => {
	const player = event.player;
	if (!player.persistentData.contains("hasHpBonus")) {
		player.persistentData.putBoolean("hasHpBonus", false);
	}
	const index = player.inventory.find(global.FULL("magic_book"));
	const item = index >= 0 ? player.inventory.getItem(index) : false;

	const attr = item ? global.CALC_ATTRS(item.nbt.attrs || []) : false;
	const mhp = player
		.getAttribute("minecraft:generic.max_health")
		.getBaseValue();
	const hp = global.VALUE_COUNTER(attr).hp;
	if (!player.persistentData.getBoolean("hasHpBonus") && item) {
		player
			.getAttribute("minecraft:generic.max_health")
			.setBaseValue(mhp + hp);
		player.persistentData.putBoolean("hasHpBonus", true);
	} else if (player.persistentData.getBoolean("hasHpBonus") && !item) {
		player
			.getAttribute("minecraft:generic.max_health")
			.setBaseValue(mhp - hp);
		player.persistentData.putBoolean("hasHpBonus", false);
	}
});

PlayerEvents.respawned((event) => {
	const player = event.player;
	player.persistentData.putBoolean("hasHpBonus", false);
	const index = player.inventory.find(global.FULL("magic_book"));
	const item = index >= 0 ? player.inventory.getItem(index) : false;

	const attr = item ? global.CALC_ATTRS(item.nbt.attrs || []) : false;
	const mhp = player
		.getAttribute("minecraft:generic.max_health")
		.getBaseValue();
	const hp = global.VALUE_COUNTER(attr).hp;
	if (!player.persistentData.getBoolean("hasHpBonus") && item) {
		player
			.getAttribute("minecraft:generic.max_health")
			.setBaseValue(mhp + hp);
		player.persistentData.putBoolean("hasHpBonus", true);
	} else if (player.persistentData.getBoolean("hasHpBonus") && !item) {
		player
			.getAttribute("minecraft:generic.max_health")
			.setBaseValue(mhp - hp);
		player.persistentData.putBoolean("hasHpBonus", false);
	}
});
