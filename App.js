import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";

export default function App() {
  // FORM STATE'LERİ
  const [baslik, setBaslik] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [kategori, setKategori] = useState("Yazılım");

  // TALEP LİSTESİ
  const [talepler, setTalepler] = useState([]);

  // DETAYI AÇILAN TALEP
  const [seciliTalep, setSeciliTalep] = useState(null);

  // ÖZGÜN ÖZELLİK: DURUM FİLTRESİ
  const [filtre, setFiltre] = useState("Tümü");

  const kategoriler = ["Yazılım", "Donanım", "Ağ"];

  const durumlar = ["Bekliyor", "İşlemde", "Tamamlandı"];

  const filtreler = ["Tümü", "Bekliyor", "İşlemde", "Tamamlandı"];

  // ----------------------------------------------------
  // KULLANICIYA MESAJ GÖSTERME
  // ----------------------------------------------------
  const mesajGoster = (mesajBasligi, mesaj) => {
    if (Platform.OS === "web") {
      window.alert(`${mesajBasligi}\n\n${mesaj}`);
    } else {
      Alert.alert(mesajBasligi, mesaj);
    }
  };

  // ----------------------------------------------------
  // G1 - G4: TALEP KAYDETME
  // ----------------------------------------------------
  const talepKaydet = () => {
    // G3: Boş veya sadece boşluk olan alanları engelle
    if (baslik.trim() === "" || aciklama.trim() === "") {
      mesajGoster(
        "Hata",
        "Başlık ve açıklama boş bırakılamaz."
      );
      return;
    }

    const yeniTalep = {
      id: Date.now().toString(),
      baslik: baslik.trim(),
      aciklama: aciklama.trim(),
      kategori: kategori,
      durum: "Bekliyor",
    };

    // Eski talepleri koru ve yenisini ekle
    setTalepler((eskiTalepler) => [
      ...eskiTalepler,
      yeniTalep,
    ]);

    // Formu temizle
    setBaslik("");
    setAciklama("");
    setKategori("Yazılım");

    mesajGoster(
      "Başarılı",
      "Arıza talebiniz başarıyla kaydedildi."
    );
  };

  // ----------------------------------------------------
  // G5: TALEP DETAYINI GÖSTERME
  // ----------------------------------------------------
  const detayGoster = (talep) => {
    setSeciliTalep(talep);
  };

  // ----------------------------------------------------
  // G6: TALEBİ SİLME
  // ----------------------------------------------------
  const talebiSil = (id) => {
    setTalepler((eskiTalepler) =>
      eskiTalepler.filter((talep) => talep.id !== id)
    );

    if (seciliTalep?.id === id) {
      setSeciliTalep(null);
    }

    mesajGoster("Silindi", "Talep başarıyla silindi.");
  };

  // Uzun basıldığında silme onayı
  const silmeOnayi = (talep) => {
    if (Platform.OS === "web") {
      const sonuc = window.confirm(
        `"${talep.baslik}" talebini silmek istediğinize emin misiniz?`
      );

      if (sonuc) {
        talebiSil(talep.id);
      }
    } else {
      Alert.alert(
        "Talebi Sil",
        `"${talep.baslik}" talebini silmek istediğinize emin misiniz?`,
        [
          {
            text: "Vazgeç",
            style: "cancel",
          },
          {
            text: "Sil",
            style: "destructive",
            onPress: () => talebiSil(talep.id),
          },
        ]
      );
    }
  };

  // ----------------------------------------------------
  // G7: DURUM DEĞİŞTİRME
  // ----------------------------------------------------
  const durumDegistir = (id, yeniDurum) => {
    setTalepler((eskiTalepler) =>
      eskiTalepler.map((talep) =>
        talep.id === id
          ? { ...talep, durum: yeniDurum }
          : talep
      )
    );

    // Detay ekranı açıksa onu da güncelle
    if (seciliTalep?.id === id) {
      setSeciliTalep((eskiTalep) => ({
        ...eskiTalep,
        durum: yeniDurum,
      }));
    }
  };

  // ----------------------------------------------------
  // ÖZGÜN ÖZELLİK: DURUMA GÖRE FİLTRELEME
  // ----------------------------------------------------
  const filtrelenmisTalepler =
    filtre === "Tümü"
      ? talepler
      : talepler.filter(
          (talep) => talep.durum === filtre
        );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.anaBaslik}>
        Akıllı Arıza Talep Yönetimi
      </Text>

      <Text style={styles.altBaslik}>
        Teknik Destek / Arıza Bildirim Sistemi
      </Text>

      {/* FORM */}
      <View style={styles.form}>
        <Text style={styles.bolumBaslik}>
          Yeni Arıza Talebi
        </Text>

        <Text style={styles.label}>
          Talep Başlığı
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Örn: Bilgisayar açılmıyor"
          value={baslik}
          onChangeText={setBaslik}
        />

        <Text style={styles.label}>
          Açıklama
        </Text>

        <TextInput
          style={[styles.input, styles.aciklamaInput]}
          placeholder="Arızayı detaylı olarak açıklayın..."
          value={aciklama}
          onChangeText={setAciklama}
          multiline
        />

        <Text style={styles.label}>
          Arıza Kategorisi
        </Text>

        <View style={styles.butonSatiri}>
          {kategoriler.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.secimButon,
                kategori === item &&
                  styles.seciliButon,
              ]}
              onPress={() => setKategori(item)}
            >
              <Text
                style={[
                  styles.secimYazi,
                  kategori === item &&
                    styles.seciliYazi,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.kaydetButon}
          onPress={talepKaydet}
        >
          <Text style={styles.kaydetYazi}>
            Talebi Kaydet
          </Text>
        </TouchableOpacity>
      </View>

      {/* LİSTE */}
      <View style={styles.listeAlani}>
        <Text style={styles.bolumBaslik}>
          Arıza Talepleri ({talepler.length})
        </Text>

        {/* ÖZGÜN ÖZELLİK: FİLTRE */}
        <Text style={styles.label}>
          Duruma Göre Filtrele
        </Text>

        <View style={styles.filtreAlani}>
          {filtreler.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.filtreButon,
                filtre === item &&
                  styles.aktifFiltre,
              ]}
              onPress={() => setFiltre(item)}
            >
              <Text
                style={[
                  styles.filtreYazi,
                  filtre === item &&
                    styles.aktifFiltreYazi,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filtrelenmisTalepler.length === 0 ? (
          <View style={styles.bosAlan}>
            <Text style={styles.bosListe}>
              Bu filtreye uygun talep bulunamadı.
            </Text>
          </View>
        ) : (
          filtrelenmisTalepler.map((talep) => (
            <TouchableOpacity
              key={talep.id}
              style={styles.kart}
              onPress={() => detayGoster(talep)}
              onLongPress={() => silmeOnayi(talep)}
              delayLongPress={700}
            >
              <View style={styles.kartUst}>
                <Text style={styles.kartBaslik}>
                  {talep.baslik}
                </Text>

                <View style={styles.durumEtiketi}>
                  <Text style={styles.durumEtiketiYazi}>
                    {talep.durum}
                  </Text>
                </View>
              </View>

              <Text style={styles.kategori}>
                Kategori: {talep.kategori}
              </Text>

              <Text style={styles.ipucu}>
                Detay için dokun • Silmek için uzun bas
              </Text>
            </TouchableOpacity>
          ))
        )}
      </View>

      {/* G5 - DETAY GÖRÜNÜMÜ */}
      {seciliTalep && (
        <View style={styles.detayAlani}>
          <View style={styles.detayUst}>
            <Text style={styles.bolumBaslik}>
              Talep Detayı
            </Text>

            <TouchableOpacity
              onPress={() => setSeciliTalep(null)}
              style={styles.kapatButon}
            >
              <Text style={styles.kapatYazi}>
                Kapat
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.detayLabel}>
            Başlık
          </Text>

          <Text style={styles.detayDeger}>
            {seciliTalep.baslik}
          </Text>

          <Text style={styles.detayLabel}>
            Açıklama
          </Text>

          <Text style={styles.detayDeger}>
            {seciliTalep.aciklama}
          </Text>

          <Text style={styles.detayLabel}>
            Kategori
          </Text>

          <Text style={styles.detayDeger}>
            {seciliTalep.kategori}
          </Text>

          <Text style={styles.detayLabel}>
            Durum
          </Text>

          <Text style={styles.detayDeger}>
            {seciliTalep.durum}
          </Text>

          {/* G7 - DURUM DEĞİŞTİRME */}
          <Text style={styles.label}>
            Durumu Değiştir
          </Text>

          <View style={styles.durumButonAlani}>
            {durumlar.map((durum) => (
              <TouchableOpacity
                key={durum}
                style={[
                  styles.durumButon,
                  seciliTalep.durum === durum &&
                    styles.aktifDurum,
                ]}
                onPress={() =>
                  durumDegistir(
                    seciliTalep.id,
                    durum
                  )
                }
              >
                <Text
                  style={[
                    styles.durumButonYazi,
                    seciliTalep.durum === durum &&
                      styles.aktifDurumYazi,
                  ]}
                >
                  {durum}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.silButon}
            onPress={() => silmeOnayi(seciliTalep)}
          >
            <Text style={styles.silButonYazi}>
              Talebi Sil
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f4f6f8",
    padding: 25,
    alignItems: "center",
  },

  anaBaslik: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1f2937",
    marginTop: 15,
    textAlign: "center",
  },

  altBaslik: {
    fontSize: 15,
    color: "#6b7280",
    marginTop: 5,
    marginBottom: 25,
    textAlign: "center",
  },

  form: {
    width: "100%",
    maxWidth: 700,
    backgroundColor: "#ffffff",
    padding: 22,
    borderRadius: 14,
    marginBottom: 25,
  },

  bolumBaslik: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 15,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginTop: 12,
    marginBottom: 7,
  },

  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
  },

  aciklamaInput: {
    height: 100,
    textAlignVertical: "top",
  },

  butonSatiri: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  secimButon: {
    flex: 1,
    minWidth: 100,
    padding: 12,
    borderWidth: 1,
    borderColor: "#9ca3af",
    borderRadius: 8,
    alignItems: "center",
  },

  seciliButon: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  secimYazi: {
    color: "#374151",
    fontWeight: "600",
  },

  seciliYazi: {
    color: "#ffffff",
  },

  kaydetButon: {
    backgroundColor: "#16a34a",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 22,
  },

  kaydetYazi: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },

  listeAlani: {
    width: "100%",
    maxWidth: 700,
    marginBottom: 25,
  },

  filtreAlani: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },

  filtreButon: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#9ca3af",
    backgroundColor: "#ffffff",
  },

  aktifFiltre: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  filtreYazi: {
    color: "#374151",
    fontWeight: "500",
  },

  aktifFiltreYazi: {
    color: "#ffffff",
  },

  bosAlan: {
    backgroundColor: "#ffffff",
    padding: 25,
    borderRadius: 10,
  },

  bosListe: {
    textAlign: "center",
    color: "#6b7280",
  },

  kart: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#2563eb",
  },

  kartUst: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },

  kartBaslik: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    flex: 1,
  },

  durumEtiketi: {
    backgroundColor: "#e5e7eb",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 15,
  },

  durumEtiketiYazi: {
    fontSize: 12,
    fontWeight: "600",
  },

  kategori: {
    color: "#4b5563",
    marginTop: 8,
  },

  ipucu: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 12,
  },

  detayAlani: {
    width: "100%",
    maxWidth: 700,
    backgroundColor: "#ffffff",
    padding: 22,
    borderRadius: 14,
    marginBottom: 30,
  },

  detayUst: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  kapatButon: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    backgroundColor: "#e5e7eb",
    borderRadius: 7,
  },

  kapatYazi: {
    fontWeight: "600",
  },

  detayLabel: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#6b7280",
    marginTop: 12,
  },

  detayDeger: {
    fontSize: 16,
    color: "#1f2937",
    marginTop: 3,
  },

  durumButonAlani: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  durumButon: {
    flex: 1,
    minWidth: 100,
    padding: 11,
    borderWidth: 1,
    borderColor: "#9ca3af",
    borderRadius: 8,
    alignItems: "center",
  },

  aktifDurum: {
    backgroundColor: "#2563eb",
    borderColor: "#2563eb",
  },

  durumButonYazi: {
    color: "#374151",
    fontWeight: "600",
  },

  aktifDurumYazi: {
    color: "#ffffff",
  },

  silButon: {
    backgroundColor: "#dc2626",
    padding: 13,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },

  silButonYazi: {
    color: "#ffffff",
    fontWeight: "bold",
  },
});