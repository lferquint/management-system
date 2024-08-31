export function calculateSubTotal(objProducts) {
  let subtotal = 0
  objProducts.forEach((element) => {
    subtotal = subtotal + element.price * element.amount
  })
  return subtotal
}
export function calculateIVA(value) {
  return value * 0.16
}

export function calculateTotal(value) {
  return value * 1.16
}
