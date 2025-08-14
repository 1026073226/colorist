ServerEvents.entityLootTables(e => {
	e.modifyEntity("minecraft:witch", table => {
		table.addPool(pool => {
			pool.addItem(
				Item.of(global.FULL("magic_paper"), {
					level: 1,
					attr: "#FFFFFF"
				})
			).count([1, 2]);
		});
	});
	e.modifyEntity("minecraft:warden", table => {
		table.addPool(pool => {
			pool.addItem(Item.of(global.FULL("magic_crystal"))).count([2, 5]);
			pool.addItem(Item.of(global.GET_DYE("black"))).count([0, 5]);
		});
	});
});
