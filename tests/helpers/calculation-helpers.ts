export function calculateTotal(totalPrice: string, addOns: string): string {
  const cleanPrice = totalPrice.replace(/[€,\s]/g, '');
  const cleanAddOns = addOns.replace(/[€,\s]/g, '');
  
  const priceValue = parseFloat(cleanPrice);
  const addOnsValue = parseFloat(cleanAddOns);
  
  if (isNaN(priceValue) || isNaN(addOnsValue)) {
    return totalPrice;
  }
  
  const total = priceValue + addOnsValue;
  
  const formatted = total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `€${formatted}`;
}
