# Günlük Defter

Günlük işleri planlamak ve takip etmek için sade bir planlayıcı. Kâğıt defterin yerini almak için yapıldı: her sabah günü planla, yaptıkça işaretle, en fazla yarını düşün.

## Özellikler

- **Bugün / Yarın / Geçmiş** görünümleri
- **Hızlı ekleme:** yaz, Enter'a bas. Başına saat yazarsan (`14:00 Rapor yaz`) saat etiketi olarak görünür
- **Sıradaki iş:** yapılmamış ilk iş vurgulanır
- **Sürükle-bırak** ya da `Alt + ↑/↓` ile sıralama
- **Yarına ertele / bugüne al**
- **Dünden kalanlar:** sabah, bitmemiş işleri tek tıkla bugüne taşı
- **Rutinler:** her güne otomatik eklenen işler
- **Günün notu**
- **Geçmiş özeti:** son 7 günün tamamlama oranı, biten iş sayısı, planlı gün serisi, 14 günlük grafik
- **Planı kopyala:** günün listesini metin olarak panoya kopyalar
- **Silmeyi geri alma**
- **Açık / koyu tema** (sistem ayarına göre)
- **Kurulabilir uygulama (PWA):** tarayıcıdan "Uygulamayı yükle" ile kurulur, internet yokken de açılır
- **Yedekleme:** Ayarlar > Yedek bölümünden tüm veriyi JSON olarak dışa aktar, başka cihazda içe aktar
- **Masaüstü (Claude uygulaması):** `Ctrl+Shift+D` global kısayolu, tepside kalan iş sayısı

## Klavye kısayolları

| Tuş | İşlev |
| --- | --- |
| `/` veya `N` | Yeni iş yaz |
| `1` `2` `3` | Bugün, Yarın, Geçmiş |
| `↑` `↓` | İşler arasında gez |
| `Boşluk` | Yapıldı / yapılmadı |
| `Enter` | Düzenle |
| `Alt + ↑/↓` | Sırayı değiştir |
| `T` | Yarına ertele / bugüne al |
| `R` | Rutin yap |
| `Delete` | Sil |

## Kullanma

**Adres:** https://omerfarukberber.github.io/gunluk-defter/

Bilgisayara ya da telefona kurmak için:

- **Chrome / Edge (Windows, Android):** adres çubuğundaki "Uygulamayı yükle" simgesine ya da menüdeki **Uygulamayı yükle** seçeneğine tıkla.
- **Safari (iPhone, iPad):** Paylaş > **Ana Ekrana Ekle**.

Kurduktan sonra kendi penceresinde açılır ve internet olmadan da çalışır.

## Veriler nerede saklanır

- **Web / kurulu sürüm:** yalnızca o tarayıcının yerel hafızası (`localStorage`). Sunucuya hiçbir şey gönderilmez. Tarayıcı verisini temizlersen kaybolur, bu yüzden ara sıra **Ayarlar > Yedek > Dışa aktar** ile yedek al.
- **Claude artifact sürümü:** Claude hesabına bağlı, sadece sana özel bulut kaydı.

Bir cihazdan diğerine geçmek için eski cihazda **Dışa aktar**, yenisinde **İçe aktar**. Yedekteki günler aynı tarihli günlerin yerine geçer, diğer günler korunur; yanlışlıkla yüklersen bildirimdeki **Geri al**'a bas.

## Geliştirme

Derleme adımı yok. Service worker yalnızca `http(s)` üzerinden çalıştığı için yerel bir sunucuyla aç:

```
python -m http.server 8765
```

Sonra http://localhost:8765 adresine git. Yayındaki dosyalardan birini değiştirdiğinde `sw.js` içindeki `SURUM` değerini artır; kurulu uygulamalar eski önbelleği bırakıp yenisini alır.

## Teknoloji

Saf HTML, CSS ve JavaScript. Çerçeve ya da derleme adımı yok. GitHub Pages üzerinden yayınlanır.

| Dosya | İşlevi |
| --- | --- |
| `index.html` | Uygulamanın tamamı |
| `manifest.webmanifest` | Kurulabilir uygulama bilgileri (ad, ikon, renk) |
| `sw.js` | Çevrimdışı çalışma için önbellek |
| `icons/` | Uygulama ikonları |
