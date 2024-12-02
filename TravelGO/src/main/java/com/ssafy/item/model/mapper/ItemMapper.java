package com.ssafy.item.model.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.ssafy.item.dto.Item;
import com.ssafy.item.dto.PurchaseItem;
import com.ssafy.item.dto.UsingBackgroundItem;
import com.ssafy.item.dto.UsingProfileItem;

@Mapper
public interface ItemMapper {
	public Item selectItem(int itemId);
	public int addUserItem(PurchaseItem purchase);
	// 유저 아이템 사용
	public int useProfileItem(UsingProfileItem profile);
	public int useBackgroundItem(UsingBackgroundItem background);
	
	// service
	public List<Item> selectAllItems();
	public List<Item> selectMyItems(String userId);
	
	// admin
	public int addItems(Item item);
	
}
