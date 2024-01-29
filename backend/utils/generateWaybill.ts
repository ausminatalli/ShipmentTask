export default function generateWaybill() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let waybill = "";

  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    waybill += characters.charAt(randomIndex);
  }

  return waybill;
}

