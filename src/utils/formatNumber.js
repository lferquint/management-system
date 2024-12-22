const formaterMXN = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  minimumFractionDigits: 2
})

function formatNumber(number) {
  return formaterMXN.format(number).replace('$', '$ ')
}

export default formatNumber
