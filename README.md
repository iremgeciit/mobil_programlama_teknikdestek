# Akıllı Arıza Talep Yönetimi

Bu proje, Mobil Programlama dersi **Hafta 5 Mini Projesi** kapsamında geliştirilmiştir.

Uygulama **Expo + React Native + JavaScript** kullanılarak hazırlanmıştır. TypeScript kullanılmamıştır. Uygulamadaki veriler yerel state üzerinde tutulmaktadır; veritabanı, API veya kullanıcı girişi bulunmamaktadır.

## Projenin Amacı

Projenin amacı, kullanıcının teknik destek veya arıza taleplerini oluşturabildiği ve oluşturduğu talepleri yönetebildiği basit bir mobil uygulama geliştirmektir.

Bu çalışma kapsamında özellikle React Native olay işleyicileri, form doğrulama, `useState` ile state yönetimi, liste güncelleme ve kullanıcı etkileşimleri üzerinde çalışılmıştır.

## Özellikler

- Talep başlığı ve açıklaması girilebilir.
- Yazılım, Donanım ve Ağ kategorileri arasından seçim yapılabilir.
- Boş veya yalnızca boşluk içeren başlık ve açıklamalar kaydedilemez.
- Her yeni talep benzersiz bir ID ile oluşturulur.
- Yeni kayıtlar eklenirken eski talepler korunur.
- Talep kartına dokunulduğunda detay bilgileri gösterilir.
- Talep için silme onayı alınır.
- Talepler `Bekliyor`, `İşlemde` ve `Tamamlandı` durumlarından birine getirilebilir.
- Kayıt, hata ve silme işlemlerinde kullanıcıya geri bildirim gösterilir.
- Talepler durumlarına göre filtrelenebilir.
- Uygulama Expo üzerinden web ortamında da çalıştırılabilir.

## Kullanılan Teknolojiler

- React Native
- Expo
- JavaScript
- React Hooks
- `useState`
- Expo Web

## Kurulum ve Çalıştırma

Projeyi bilgisayara aldıktan sonra bağımlılıkları yüklemek için:

```bash
npm install
```

Projeyi başlatmak için:

```bash
npx expo start
```

Doğrudan web üzerinde çalıştırmak için:

```bash
npx expo start --web
```

## İşlevsel Gereksinimler

| Kod | Gereksinim | Durum |
|---|---|---|
| G1 | Talep başlığı ve açıklamasının state içerisinde tutulması | Tamamlandı |
| G2 | En az üç arıza kategorisinin seçilebilmesi | Tamamlandı |
| G3 | Geçersiz alanlarla kayıt yapılmasının engellenmesi | Tamamlandı |
| G4 | Geçerli talebin benzersiz ID ile listeye eklenmesi | Tamamlandı |
| G5 | Talebe dokunulduğunda detayların gösterilmesi | Tamamlandı |
| G6 | Talep silinirken kullanıcıdan onay alınması | Tamamlandı |
| G7 | Talep durumunun üç seçenek arasında değiştirilmesi | Tamamlandı |
| G8 | İşlemlerde kullanıcı geri bildirimi verilmesi | Tamamlandı |

## Özgün Özellik: Duruma Göre Filtreleme

Uygulamaya özgün özellik olarak **duruma göre talep filtreleme** eklenmiştir. Kullanıcı `Tümü`, `Bekliyor`, `İşlemde` ve `Tamamlandı` seçeneklerinden birine dokunarak görüntülenen talepleri değiştirebilir. Kullanıcının seçimi `filtre` state'i içerisinde tutulmaktadır. Filtre değiştiğinde talep listesi yeniden hesaplanarak yalnızca ilgili durumdaki kayıtlar gösterilmektedir. Böylece çok sayıda talep bulunduğunda kullanıcının ilgilendiği kayıtlara daha kolay ulaşması amaçlanmıştır.

