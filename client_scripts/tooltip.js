ItemEvents.tooltip(e => {
	e.addAdvanced(global.FULL("magic_paper"), (item, advanced, text) => {
		let nbt = item.nbt;
		let attr = global.CALC_ATTR(nbt);
		text.add(
			Text.yellow("等级: ").append(
				Text.of(nbt?.level || "未知").color(
					global.FOMMAT(nbt?.attr || "white")
				)
			)
		);
		if (!nbt?.attr) return;
		global.ATTR_SHOW(e, text, attr);
		
	});
	e.addAdvanced(global.FULL("magic_book"), (item, advanced, text) => {
		let nbt = item.nbt;
		let attr = global.CALC_ATTRS(nbt.attrs);
		text.add(
			Text.yellow("等级: ").append(
				Text.of(nbt.attr.level || "未知").color(
					global.FOMMAT(nbt.attr.color || "white")
				)
			)
		);
		if (!nbt?.attr) return;
		global.ATTR_SHOW(e, text, attr, Text.white("数量: ").append(Text.white(`${nbt.attrs.length}/${global.MAX_ATTRS}`)));
	});
});
