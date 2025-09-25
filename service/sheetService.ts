
import { GOOGLE_SHEETS_SCRIPT_URL } from '../constants';
import type { SheetOrderData } from '../types';

export const saveOrder = async (orderData: SheetOrderData): Promise<{ success: boolean; message: string; }> => {
    try {
        const response = await fetch(`${GOOGLE_SHEETS_SCRIPT_URL}?action=saveOrder`, {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify({ orderData }),
        });

        if (!response.ok) {
            throw new Error(`Google Sheets API 回應錯誤，狀態碼: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success) {
            throw new Error(result.error || '無法將訂單儲存至 Google Sheets');
        }

        return { success: true, message: result.message };

    } catch (error) {
        console.error('儲存訂單至 Google Sheet 時發生錯誤:', error);
        if (error instanceof Error) {
            return { success: false, message: error.message };
        }
        return { success: false, message: '儲存訂單時發生未知錯誤' };
    }
};
