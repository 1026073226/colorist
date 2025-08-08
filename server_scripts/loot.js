ServerEvents.entityLootTables((e) => {
	e.modifyEntity("minecraft:witch", (table) => {
		table.addPool((pool) => {
			pool.addItem(global.FULL("magic_paper{level:2}"), 1);
		});
	});
});