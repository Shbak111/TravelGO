package com.ssafy.item.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
	private int itemId;
	private String itemName;
	private int price;
	private int itemType;
	private String itemImg;
	private String itemDescription;
}
