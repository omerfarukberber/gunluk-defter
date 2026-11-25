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

## Çalıştırma

Tek dosyalık bir uygulamadır, kurulum gerektirmez. `index.html` dosyasını tarayıcıda açman yeterli.

Veriler nerede saklanır:

- **Claude artifact sürümü:** Claude hesabına bağlı, sadece sana özel bulut kaydı.
- **Dosyayı doğrudan açınca:** tarayıcının yerel hafızası (`localStorage`). Tarayıcı verisini temizlersen kaybolur.

## Teknoloji

Saf HTML, CSS ve JavaScript. Çerçeve ya da derleme adımı yok.
