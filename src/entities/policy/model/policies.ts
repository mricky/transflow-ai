import { PolicyDoc, RagSearchResult } from "./types";

export const TRANSFLOW_POLICIES: PolicyDoc[] = [
  {
    id: "TF-POL-01",
    category: "baggage",
    title: "Kebijakan Bagasi & Muatan Barang Bawaan",
    code: "TF-REG-2026-LUG01",
    summary: "Batas 1 koper maks 20 kg (24 inci) dan 1 tas jinjing ransel gratis per penumpang.",
    content: [
      "Setiap penumpang berhak atas 1 bagasi cuma-cuma berupa koper/tas pakaian dengan ukuran maksimum 24 inci dan berat tidak melebihi 20 kg.",
      "Penumpang diperbolehkan membawa 1 tas jinjing/ransel kecil ke dalam kabin untuk ditaruh di bawah kursi atau dipangku.",
      "Sepeda lipat (folding bike) diperkenankan masuk bagasi belakang HANYA jika terlipat rapi di dalam tas kardus/hardcase dan telah dikonfirmasi sebelumnya.",
      "DILARANG KERAS membawa hewan peliharaan (anjing, kucing, burung, reptil), buah beraroma tajam (durian, cempedak), serta bahan mudah terbakar atau beracun."
    ],
    rules: {
      "Maksimal Koper": "24 inci / 20 kg per penumpang",
      "Kabin Jinjing": "Maksimal 7 kg (ransel/laptop bag)",
      "Hewan Peliharaan": "Dilarang total dalam kabin maupun bagasi",
      "Kelebihan Bagasi": "Dikenakan biaya Rp25.000/kg atau memesan 1 kursi ekstra"
    },
    citation: "Buku Pedoman Operasional TransFlow Bab IV Pasal 12 (Standar Muatan Barang)"
  },
  {
    id: "TF-POL-02",
    category: "pool_location",
    title: "Lokasi Pool, Drop Points, & Akses Transit",
    code: "TF-REG-2026-LOC02",
    summary: "Panduan navigasi pool Bandung Baltos, Pasteur, Buah Batu, Blora Sudirman, dan Soetta.",
    content: [
      "Bandung Baltos: Terletak di Balubur Town Square, Lobby Lower Ground (pintu masuk sisi utara Jl. Tamansari, depan ITB). Ruang tunggu ber-AC dilengkapi Wi-Fi & colokan.",
      "Bandung Pasteur: Jl. Dr. Djunjunan No. 77 (200 meter sebelum gerbang tol Pasteur arah keluar Bandung).",
      "Jakarta Blora Sudirman: Kawasan Dukuh Atas Sudirman (hanya 50 meter berjalan kaki dari Stasiun MRT Dukuh Atas BNI dan Stasiun KRL Sudirman). Sangat strategis untuk transit komuter SCBD/Thamrin.",
      "Jakarta Bekasi Barat: Ground Floor Pintu Selatan Mega Mall Bekasi.",
      "Tangerang Bandara Soetta: Drop point di Curbside Keberangkatan Terminal 3 Domestik (Gate 3) dan Terminal 2 (Gate 2)."
    ],
    rules: {
      "Waktu Check-in": "Wajib hadir 15 menit sebelum jam keberangkatan tertera di tiket",
      "Toleransi Keterlambatan": "Armada berangkat tepat waktu; toleransi tunggu maksimal 5 menit"
    },
    citation: "Direktori Jaringan Terminal & Rute Shuttle TransFlow Edisi 2026"
  },
  {
    id: "TF-POL-03",
    category: "reschedule",
    title: "SOP Pembatalan, Refund, & Reschedule Tiket",
    code: "TF-REG-2026-REF03",
    summary: "Reschedule gratis 1x minimal 2 jam sebelum berangkat; refund 80% jika >6 jam.",
    content: [
      "Perubahan Jadwal (Reschedule): Dapat dilakukan mandiri melalui aplikasi atau dibantu AI Concierge maksimal 2 jam sebelum waktu keberangkatan tertera (1x bebas biaya selisih tarif).",
      "Pembatalan > 6 Jam: Pengembalian dana (refund) sebesar 80% dari harga tiket bruto (potongan administrasi 20%).",
      "Pembatalan 2 – 6 Jam: Pengembalian dana 50% atau dialihkan menjadi voucher kredit 100% untuk perjalanan berikutnya.",
      "Pembatalan < 2 Jam / No-Show: Tiket dianggap hangus (non-refundable), kursi otomatis dilepas kembali ke pool sistem."
    ],
    rules: {
      "Reschedule": "Gratis 1x (min. 2 jam sebelum keberangkatan)",
      "Refund >6 Jam": "80% dari total tarif tiket",
      "Refund 2-6 Jam": "50% dari total tarif tiket",
      "No-Show": "0% (Tiket hangus)"
    },
    citation: "Syarat & Ketentuan Pemesanan Tiket Elektronik TransFlow Pasal 8"
  },
  {
    id: "TF-POL-04",
    category: "fleet_spec",
    title: "Spesifikasi Kabin Toyota HiAce Premio VIP",
    code: "TF-REG-2026-FLT04",
    summary: "Konfigurasi 8 kursi mewah: Captain Seats 110cm legroom, USB fast-charge, dan suspensi empuk.",
    content: [
      "Armada Toyota HiAce Premio generasi terbaru dengan sasis panjang dan peredam kabin ganda.",
      "Konfigurasi 8 Penumpang: Baris 1 & 2 dilengkapi kursi Captain independen dengan armrest ganda, sandaran kaki (footrest), dan reclining hingga 135 derajat.",
      "Setiap kursi Captain memiliki jarak antar kursi (seat pitch/legroom) selebar 110 cm dan port pengisian daya cepat USB Type-C & Type-A.",
      "Kabin dilengkapi sistem pendingin udara (AC) plasma cluster individual dan kompartemen bagasi belakang berkapasitas 200 Liter."
    ],
    rules: {
      "Kapasitas Total": "8 Penumpang + 1 Sopir",
      "Fitur Kursi 1A & 2A": "Captain Seat Jendela Kiri (Paling Lega & Tenang)",
      "Fitur Kursi 1B": "Captain Seat dekat pintu geser elektrik (Akses Cepat)",
      "Fasilitas": "USB-C Port, Air Purifier, Recliner 135°"
    },
    citation: "Dokumentasi Standar Kelayakan Armada Eksekutif TransFlow"
  },
  {
    id: "TF-POL-05",
    category: "toll_mbz_routing",
    title: "SOP Rute Tol MBZ vs Jalur Tol Bawah Jakarta-Cikampek",
    code: "TF-SOP-TOLL-01",
    summary: "HiAce Premio tinggi 2,28m melampaui batas portal MBZ (2,10m); armada wajib lewat Tol Bawah.",
    content: [
      "Spesifikasi dimensi fisik armada Toyota HiAce Premio memiliki tinggi bodi standar pabrikan 2.280 mm (2,28 meter) atau hingga 2.350 mm dengan modul ventilasi atap.",
      "Portal gantry pembatas ketinggian pada Jalan Layang Sheikh Mohammed bin Zayed (Tol Layang MBZ) dibatasi secara ketat maksimal 2.100 mm (2,10 meter) khusus kendaraan Golongan I non-bus/non-minibus tinggi.",
      "Demi keselamatan struktural dan kepatuhan regulasi Jasa Marga, SELURUH armada eksekutif TransFlow WAJIB melintas via Jalur Tol Bawah (Ruas Jakarta-Cikampek eksisting).",
      "Estimasi waktu tempuh normal Pasteur - Cawang via Tol Bawah berkisar 2 jam 15 menit s/d 2 jam 45 menit dengan pengawalan GPS Fleet Telematics."
    ],
    rules: {
      "Tinggi Bodi HiAce": "2,28 meter (2.280 mm)",
      "Batas Portal MBZ": "2,10 meter (2.100 mm) - DILARANG MASUK",
      "Rute Wajib": "Jalur Tol Bawah (Jakarta - Cikampek eksisting)",
      "Regulasi": "Kepmen PUPR & Standar Keselamatan Operasional Jasa Marga"
    },
    citation: "Standar Operasional Prosedur (SOP) Rute & Navigasi Koridor Tol TransFlow Bab II"
  },
  {
    id: "TF-POL-06",
    category: "rest_area",
    title: "SOP Pemberhentian Rest Area Tol Cipularang & Japek",
    code: "TF-SOP-REST-02",
    summary: "Jeda istirahat 15 menit di Rest Area KM 72 / 88 / 97 untuk toilet break, musala, dan refuel.",
    content: [
      "Rute Bandung menuju Jakarta: Armada dijadwalkan singgah reguler selama 15 menit di Rest Area KM 72A atau KM 97 Tol Cipularang untuk kebutuhan toilet, ibadah, atau membeli minuman.",
      "Rute Jakarta menuju Bandung: Armada singgah reguler di Rest Area KM 88B atau KM 72B.",
      "Seluruh rest area rekanan TransFlow terverifikasi memiliki toilet VIP bersih, musala ber-AC, ATM Center, gerai F&B higienis, dan charging station.",
      "Sopir akan mengumumkan waktu singgah (maksimal 15 menit) demi menjaga komitmen on-time performance armada berikutnya."
    ],
    rules: {
      "Durasi Singgah": "Tepat 15 Menit (Toilet Break & Sholat)",
      "Spot Arah Jakarta": "Rest Area KM 72A & KM 97 Cipularang",
      "Spot Arah Bandung": "Rest Area KM 88B & KM 72B",
      "Fasilitas": "Toilet Bersih, Musala AC, Minimarket, Stasiun Pengisian Daya"
    },
    citation: "Buku Panduan Layanan Penumpang VIP TransFlow (Rest Area & Passenger Comfort)"
  },
  {
    id: "TF-POL-07",
    category: "weather_safety",
    title: "Protokol Keselamatan Cuaca Ekstrem & Turunan KM 90-100",
    code: "TF-SOP-WEATHER-03",
    summary: "Batas kecepatan 60 km/jam saat hujan/kabut di turunan tajam KM 90-100 Cipularang.",
    content: [
      "Segmen Tol Cipularang KM 90 s/d KM 100 memiliki kontur turunan panjang berliku dan rawan aquaplaning saat hujan lebat atau kabut tebal.",
      "Saat sensor cuaca telemetri mendeteksi presipitasi tinggi, sistem membatasi kecepatan laju armada maksimal 60 km/jam untuk menjaga traksi ban komersial 235/65 R16C.",
      "Penumpang akan menerima notifikasi dinamis pada aplikasi apabila terjadi penyesuaian estimasi waktu tiba (ETA) sebesar +15 hingga +30 menit demi prioritas keselamatan.",
      "Armada dilengkapi pengereman ABS, Vehicle Stability Control (VSC), dan Emergency Brake Signal yang aktif otomatis."
    ],
    rules: {
      "Batas Kecepatan Normal": "80 - 100 km/jam",
      "Batas Kecepatan Hujan": "Maksimal 60 km/jam di KM 90 - 100",
      "Fitur Keselamatan": "ABS + VSC + Traction Control + Ban 235/65 R16C",
      "Notifikasi Keterlambatan": "Otomatis dihitung melalui Dynamic ETA Telematics"
    },
    citation: "Instruksi Kerja Keselamatan Berkendara (Safety Driving Protocol) TransFlow Divisi Operasional"
  }
];

export function searchRagPolicies(query: string): RagSearchResult {
  const lowerQuery = query.toLowerCase();
  
  let bestDoc = TRANSFLOW_POLICIES[0];
  let highestScore = 0;
  let snippet = "";

  TRANSFLOW_POLICIES.forEach((doc) => {
    let score = 0;
    const allText = `${doc.title} ${doc.summary} ${doc.content.join(" ")} ${JSON.stringify(doc.rules)}`.toLowerCase();

    const keywords = lowerQuery.split(/\s+/).filter(k => k.length > 2);
    keywords.forEach(word => {
      if (allText.includes(word)) score += 10;
      if (doc.title.toLowerCase().includes(word)) score += 25;
      if (doc.summary.toLowerCase().includes(word)) score += 15;
    });

    if ((lowerQuery.includes("koper") || lowerQuery.includes("bagasi") || lowerQuery.includes("berat") || lowerQuery.includes("sepeda") || lowerQuery.includes("hewan")) && doc.category === "baggage") {
      score += 50;
    }
    if ((lowerQuery.includes("lokasi") || lowerQuery.includes("pool") || lowerQuery.includes("alamat") || lowerQuery.includes("mrt") || lowerQuery.includes("turun")) && doc.category === "pool_location") {
      score += 50;
    }
    if ((lowerQuery.includes("batal") || lowerQuery.includes("reschedule") || lowerQuery.includes("ganti") || lowerQuery.includes("refund") || lowerQuery.includes("telat")) && doc.category === "reschedule") {
      score += 50;
    }
    if ((lowerQuery.includes("kursi") || lowerQuery.includes("captain") || lowerQuery.includes("lega") || lowerQuery.includes("charger") || lowerQuery.includes("hiace") || lowerQuery.includes("ban") || lowerQuery.includes("spakbor")) && doc.category === "fleet_spec") {
      score += 50;
    }
    if ((lowerQuery.includes("mbz") || lowerQuery.includes("tol") || lowerQuery.includes("layang") || lowerQuery.includes("bawah") || lowerQuery.includes("tinggi") || lowerQuery.includes("japek")) && doc.category === "toll_mbz_routing") {
      score += 60;
    }
    if ((lowerQuery.includes("rest area") || lowerQuery.includes("istirahat") || lowerQuery.includes("toilet") || lowerQuery.includes("km 72") || lowerQuery.includes("km 88") || lowerQuery.includes("km 97") || lowerQuery.includes("sholat")) && doc.category === "rest_area") {
      score += 60;
    }
    if ((lowerQuery.includes("hujan") || lowerQuery.includes("cuaca") || lowerQuery.includes("macet") || lowerQuery.includes("eta") || lowerQuery.includes("cipularang") || lowerQuery.includes("km 92") || lowerQuery.includes("lambat") || lowerQuery.includes("durasi")) && (doc.category === "weather_safety" || doc.category === "toll_mbz_routing")) {
      score += 60;
    }

    if (score > highestScore) {
      highestScore = score;
      bestDoc = doc;
      snippet = doc.content[0] || doc.summary;
    }
  });

  return {
    document: bestDoc,
    score: Math.min(Math.round((highestScore / 80) * 100), 99),
    highlightSnippet: snippet
  };
}
