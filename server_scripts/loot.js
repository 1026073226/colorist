ServerEvents.entityLootTables((e) => {
	e.modifyEntity("minecraft:witch", (table) => {
		table.addPool((pool) => {
			pool.addItem(
				Item.of(global.FULL("magic_paper"), {
					level: 1,
					attr: "#00FFFF",
				})
			).count([1, 2]);
			pool.addItem(Item.of(global.FULL("magic_crystal"))).count([4, 6]);
		});
	});
	e.modifyEntity("minecraft:creeper", (table) => {
		table.addPool((pool) => {
			pool.addItem(
				Item.of(global.FULL("magic_paper"), {
					level: 1,
					attr: "#00FF00",
				})
			).count([0, 1]);
			pool.addItem(Item.of("minecraft:tnt")).count([0, 1]);
		});
	});
	e.modifyEntity("minecraft:skeleton", (table) => {
		table.addPool((pool) => {
			pool.addItem(
				Item.of(global.FULL("magic_paper"), {
					level: 1,
					attr: "#FFFFFF",
				})
			).count([0, 1]);
		});
	});
	e.modifyEntity("minecraft:warden", (table) => {
		table.addPool((pool) => {
			pool.addItem(Item.of(global.FULL("magic_crystal"))).count([4, 6]);
			pool.addItem(Item.of(global.GET_DYE("black"))).count([0, 5]);
			pool.addItem(
				Item.of(global.FULL("magic_paper"), {
					level: 1,
					attr: "#00FFFF",
				})
			).count([0, 3]);
		});
	});
	e.modifyEntity("minecraft:enderman", (table) => {
		table.addPool((pool) => {
			pool.addItem(Item.of(global.FULL("magic_crystal"))).count([1, 2]);
			pool.addItem(Item.of(global.GET_DYE("black"))).count([0, 2]);
			pool.addItem(Item.of("minecraft:obsidian")).count(1);
			pool.addItem(
				Item.of(global.FULL("magic_paper"), {
					level: 1,
					attr: "#00FFFF",
				})
			).count([0, 2]);
		});
	});
});

ServerEvents.blockLootTables((e) => {
	e.modifyBlock("minecraft:amethyst_block", (table) => {
		table.addPool((pool) => {
			pool.addItem(Item.of(global.FULL("magic_crystal_ore")));
		});
	});
});
