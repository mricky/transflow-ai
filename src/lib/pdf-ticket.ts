export interface BoardingPassData {
  ticketNumber: string;
  bookingRef: string;
  tripId: string;
  origin: string;
  destination: string;
  departureTime: string;
  departureDate: string;
  seatNumber: string;
  seatCategory: string;
  passengerName: string;
  passengerPhone: string;
  totalFareIdr: number;
  plateNumber: string;
  qrPayload: string;
  lockTimestamp: string;
}

export async function generateBoardingPassPdf(data: BoardingPassData) {
  // Dynamically import jsPDF on client only to avoid Webpack chunk SSR error
  const { jsPDF } = await import("jspdf");

  // Create A5 Portrait document
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a5"
  });

  // Background Header Card (Executive Deep Navy)
  doc.setFillColor(15, 23, 42); // #0F172A
  doc.roundedRect(10, 10, 128, 32, 3, 3, "F");

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("TRANSFLOW EXECUTIVE", 16, 22);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184); // Slate 400
  doc.text("OFFICIAL BOARDING PASS • HIACE PREMIO VIP", 16, 28);
  doc.text("Anti-Race-Condition Certified ID: " + data.bookingRef, 16, 34);

  // Status Badge
  doc.setFillColor(16, 185, 129); // Emerald 500
  doc.roundedRect(104, 16, 28, 8, 2, 2, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.text("CONFIRMED", 108, 21.5);

  // Main Ticket Container Card
  doc.setDrawColor(226, 232, 240); // Slate 200
  doc.setFillColor(255, 255, 255);
  doc.roundedRect(10, 46, 128, 120, 3, 3, "FD");

  // Route Info
  doc.setTextColor(100, 116, 139);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("RUTE PERJALANAN SHUTTLE", 16, 56);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.text(data.origin, 16, 63);
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text("MENUJU KE", 16, 68);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text(data.destination, 16, 74);

  // Horizontal divider
  doc.setDrawColor(241, 245, 249);
  doc.line(16, 79, 132, 79);

  // Grid Info: Waktu & Tanggal
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("WAKTU KEBERANGKATAN", 16, 86);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text(data.departureTime + " WIB", 16, 93);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("TANGGAL", 74, 86);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(11);
  doc.text(data.departureDate, 74, 93);

  // Grid Info: Kursi & Armada
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("NOMOR KURSI", 16, 102);
  doc.setFillColor(241, 245, 249);
  doc.roundedRect(16, 105, 36, 14, 2, 2, "F");
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text(data.seatNumber, 20, 114);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("ARMADA & PLAT", 74, 102);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("HiAce VIP (" + data.plateNumber + ")", 74, 110);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(data.seatCategory, 74, 115);

  // Horizontal divider
  doc.setDrawColor(241, 245, 249);
  doc.line(16, 122, 132, 122);

  // Passenger Info
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("NAMA PENUMPANG", 16, 129);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(data.passengerName, 16, 135);

  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("WHATSAPP / HP", 74, 129);
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text(data.passengerPhone, 74, 135);

  // Tarif & Idempotency Key
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text("TOTAL TARIF LUNAS", 16, 144);
  doc.setTextColor(16, 185, 129);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Rp " + data.totalFareIdr.toLocaleString("id-ID"), 16, 150);

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text("Security Token: " + data.ticketNumber, 16, 158);
  doc.text("Aturan Bagasi: Maks 1 Koper 24\" (20kg) + 1 Ransel", 16, 162);

  // Footer Note
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text("Tunjukkan E-Ticket ini ke petugas pool saat boarding 15 menit sebelum berangkat.", 10, 172);

  // Save PDF file to download
  doc.save(`TransFlow_Ticket_${data.bookingRef}.pdf`);
}
