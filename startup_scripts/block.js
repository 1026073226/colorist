StartupEvents.registry("block", e => {
	global
		.BLOCK(e, "magic_table")
		.model(global.FULL("block/magic_table"))
		.soundType("stone")
		.hardness(1.0)
		.lightLevel(3)
		.blockEntity(e =>
			e.initialData({
				item: "minecraft:air",
				nbt: {}
			})
		)
		.rightClick(global.MAGIC_TABLE);

	global
		.BLOCK(e, "magic_crystal_ore")
		.soundType("stone")
		.hardness(2.0)
		.requiresTool(true)
		.tagBlock("minecraft:mineable/pickaxe")
		.tagBlock("forge:ore");
});
