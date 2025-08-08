ItemEvents.tooltip((event) => {
	event.addAdvanced("colorist:magic_paper", (item, advanced, text) => {
		let nbt = item.nbt;
		text.add(Text.yellow("等级: ").append(Text.white(nbt?.level || 1)));
	});
});
