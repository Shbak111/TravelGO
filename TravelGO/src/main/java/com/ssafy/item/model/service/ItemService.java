package com.ssafy.item.model.service;

import java.util.List;

import com.github.pagehelper.PageInfo;
import com.ssafy.item.dto.Item;
import com.ssafy.item.dto.PurchaseItem;
import com.ssafy.item.dto.UsingBackgroundItem;
import com.ssafy.item.dto.UsingProfileItem;

public interface ItemService {
	public PageInfo<?> selectAllItems(int page, int size);
	public int purchaseItems(PurchaseItem purchase);
	public PageInfo<?> selectMyItems(String userId, int page, int size);
	
	// 아이템 사용
	public int useProfileItem(UsingProfileItem profile);
	public int useBackgroundItem(UsingBackgroundItem background);
	
	// admin
	public int addItems(Item item);
}
