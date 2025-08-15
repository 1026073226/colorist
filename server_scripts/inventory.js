PlayerEvents.inventoryChanged(event => {
	const player = event.player;
	const index = player.inventory.find(global.FULL("magic_book"));
	const item = player.inventory.getItem(index);
});
