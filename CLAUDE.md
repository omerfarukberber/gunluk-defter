# Günlük Defter — proje rehberi

Ömer'in kişisel günlük planlayıcısı. Kâğıt defterin yerini alıyor: her sabah günü planlar, işleri sırayla yapar, yaptıkça işaretler. En fazla yarını planlar (uzun vadeli planlama yok).

## İletişim
- Kullanıcıyla Türkçe konuş. Arayüz metinleri Türkçe.
- Uygulama sade kalmalı: yeni bir özellik eklemeden önce gerçekten gerekli mi diye düşün.
- Saati gelen iş için bildirim istenmedi, ekleme.

## Yapı
- Uygulama tek dosya: `index.html` (HTML + CSS + JS, çerçeve yok, derleme adımı yok).
- PWA dosyaları: `manifest.webmanifest`, `sw.js`, `logo.svg`, `icons/`, `fonts/`. Yollar göreli olmalı (GitHub Pages `/gunluk-defter/` alt dizininde çalışıyor).
- `sw.js` değişen bir dosyayı yayınlarken `SURUM`'u artır (şu an `v4`); yeni bir dosya eklersen `DOSYALAR` listesine de ekle. Sayfa için önce ağ, diğer dosyalar için önce önbellek kullanılır.
- Service worker yalnızca `http(s)` üzerinde ve Claude çerçevesinin dışında kaydedilir.
- Yerel deneme: `python -m http.server 8765` (`.claude/launch.json` içinde `defter` olarak tanımlı).
- Logo: `logo.svg`. Lacivert yuvarlatılmış kare (hafif çapraz gradyan #075170 → #032843), krem renkli büyük "G" (#f5f0e3) ve G'nin içinden çıkan nane yeşili tik (#80f7ae). Ömer'in verdiği görselden SVG olarak yeniden çizildi. Başlıkta satır içi SVG olarak, `index.html` içindeki `icon()` fonksiyonunda (Claude masaüstü Dock/tepsi) aynı yol verileriyle (`LOGO_G`, `LOGO_C`) kullanılır; logo değişirse üçünü birlikte güncelle. `icons/` içindeki PNG'ler (`gd-favicon-32`, `gd-192`, `gd-512`, `gd-maskable-512`, `gd-apple-180`) logo.svg'den headless Chrome ile üretildi. İkon değişince dosya adını da değiştir (ya da `?v=` artır): tarayıcı ve eski service worker aynı adresteki eski ikonu önbellekten verir, kurulu uygulamaya eski ikon gider.
- Yazı tipi: Inter variable, `fonts/` içinden yerel yüklenir (latin + latin-ext; Türkçe harfler latin-ext'te). Google Fonts ya da başka dış kaynak kullanma. Rakamlar `tabular-nums`.
- Tipografi: tarih başlığı 30-40px kalın, işler 16px, yardımcı metinler 13-14px.
- Tasarım dili: Linear / Things gibi sakin ve düzenli. Düzeni boşluk ve hizalama kurar; iş satırlarında çizgi yok, gölge yalnızca panel, bildirim ve sürüklemede. Vurgu rengi logo ailesinden yumuşak, sakin bir ton ve yalnızca tik, ilerleme çubuğu ve "Sıradaki" işaretinde kullanılır: açık temada petrol mavisi `--acc` #235b74 (kutunun içindeki tik beyaz), koyu temada soluk adaçayı yeşili `--acc` #8cc9ad (tik koyu gri). Logodaki neon nane yeşilini (#80f7ae) uygulama içinde kullanma; Ömer yapay ve parlak bulmuyor, sade ve profesyonel tonlar istiyor. Koyu zeminli bildirimdeki düğme için `--accInv`. Önemli işareti kırmızı nokta (`--imp`), devreden işler pembe blok (`--pink`), arama eşleşmesi sarı (`--mark`).
- Telefon: 360px'te yatay kaydırma olmamalı, tıklanabilir alanlar en az 40px. Dokunmatik ekranda iş satırının işlemleri satıra dokununca altında açılır (`.task.sel`).

## Hareket (animasyon)
- Kısa ve sakin (çoğu 200-380 ms), ortak eğri `--ease`, yaylanma `--spring`. "Hareketi azalt" (prefers-reduced-motion) açıksa hiçbiri çalışmaz: CSS'te genel kural, JS'te `motion()` kontrolü. Yeni animasyon eklerken ikisine de uy.
- Açılış: `<body class="intro">` ile logo, başlık, sekmeler ve işler sırayla gelir; sınıf 1.6 sn sonra kaldırılır.
- Liste (`renderList`): FLIP. Kalan işler yeni yerine kayar, yeni iş belirir; kaldırılan işin kopyası `#ghosts` katmanında kaybolur (`exitHint`: silme sola, yarına ertele sağa, bugüne al sola). Gün/sekme değişince liste animasyonu yapılmaz, içerik toptan yumuşakça gelir.
- Tamamlama: kutu "pop", üstü çizgi soldan sağa çizilir (text-decoration değil, arka plan çizgisi). Günün son işi işaretlenince ilerleme çubuğunda parıltı ve "Bugünün işleri tamam" bildirimi; silme bunu tetiklemez (`celebrate`).
- Sekmelerin seçili arka planı `.tabs .ind` göstergesidir ve kayar (`moveInd`).
- Testlerde kullanıcının localhost:8765 verisine dokunma; `.claude/launch.json` içindeki `defter-test` (port 8766) ayrı bir tarayıcı hafızası kullanır.

## Uygulamayı yükle (PWA kurulumu)
- Yalnızca kendi sitesinde (Claude çerçevesi dışında, `webApp`) ve uygulama kurulu değilken (`standalone()`).
- Chrome/Edge/Android: `beforeinstallprompt` olayı saklanır; altta 2,5 sn sonra beliren kart ("Uygulama olarak yükle") ve Ayarlar > Uygulama'daki düğme tarayıcının kurulum penceresini açar. Olay bir kez kullanılabilir, her denemeden sonra bırakılır.
- iPhone/iPad (Safari): kurulum olayı yok; kart ve panel "Paylaş > Ana Ekrana Ekle" adımını gösterir.
- Kartın "×" düğmesi `gunluk-defter-yukle-kapat` anahtarıyla kartı kalıcı kapatır; panel bölümü her zaman durur.

## Tema
- Başlıktaki düğme: Sistem → Açık → Koyu. Varsayılan Sistem. Seçim `localStorage` içinde `gunluk-defter-tema` (`light` / `dark`; Sistem'de anahtar silinir).
- `<head>` içindeki küçük betik temayı sayfa çizilmeden `html[data-theme]` olarak uygular (titreme olmasın diye); bunu `<style>`'dan önce tut.
- Renkler yalnızca `:root` değişkenlerinde, `light-dark(açık, koyu)` ile. Koyu tema saf siyah değil, koyu gri (`#18191b` zemin). Yeni renk eklerken iki temayı da yaz.

## Veri modeli
- Gün belgesi (anahtar `YYYY-AA-GG`): `{ d, tasks: [{id, text, time, done, moved, routine, important?}], carried, ra, note, hideDone? }`
  - `moved`: iş başka güne taşındı. `routine`: hangi rutinden geldiği. `ra`: rutinler o güne eklendi mi. `carried`: dünden kalanlar sorusu cevaplandı mı.
  - Opsiyonel alanlar yalnızca `true` iken saklanır: `important` (önemli işareti), `hideDone` (o günün yapılan işleri listeden gizli). Eski kayıtlar bu alanlar olmadan aynen açılmalı; `norm`/`normTask` bilinmeyen alanları atar, yeni alan eklerken oraya da ekle.
- localStorage anahtarlarını (`gunluk-defter-v1`, `gunluk-defter-ayar-v1`) değiştirme.
- Ayar belgesi (anahtar `settings`): `{ routines: [{id, text, time}] }`

## Kayıt katmanı
- Önce `localStorage` (`gunluk-defter-v1`, `gunluk-defter-ayar-v1`); her zaman önbellek olarak yazılır.
- Claude artifact içinde çalışırken `window.claude.use("db")` ve `use("user")` ile `data/users/<uid>/` koleksiyonuna da yazar. Bu API Claude dışında yoktur; kod bunu kontrol eder ve yalnızca localStorage ile çalışır.
- `use("desktop")`: Claude masaüstü uygulamasında kurulu sürümde global kısayol (Ctrl+Shift+D), tepsi simgesi ve Dock rozeti. Claude dışında çalışmaz.

## Özellikler (kısa notlar)
- **Önemli:** iş satırındaki nokta düğmesi ya da `I`. Kopyalanan planda `!` ile gelir.
- **Odak modu:** `F` ya da başlıktaki hedef düğmesi. Tam ekran, yalnızca sıradaki iş; "Yaptım" (Enter) ve "Sonrakine geç" (→) sırayı değiştirmez. `Esc` çıkar. Yalnızca bugün için.
- **Geçmiş'te arama:** işlerde ve günün notlarında, Türkçe büyük/küçük harf duyarsız (`toLocaleLowerCase('tr')`), eşleşmeler `<mark>`.
- **Günü temizle:** "Yapılanları gizle" yapılan işleri silmez, `hideDone` ile gizler; "Göster" geri açar. Gizliyken sıralama gizli işlerin yerini korur.
- Onay için tarayıcının `confirm()` penceresini kullanma (Claude çerçevesinde engellenebilir); panel içi onay ya da "Geri al" bildirimi kullan.

## Yedek (JSON)
- Ayarlar > Yedek: "Yedekle" ve "Geri yükle". Dosya biçimi: `{ uygulama: "gunluk-defter", surum: 1, tarih, days, settings }`. Yalnızca `days` nesnesi (localStorage biçimi) de kabul edilir.
- Geri yükleme iki adımlı: dosya okunur, panelde ne değişeceği gösterilir ("N günün üzerine yazılacak"), "Üzerine yaz" ile uygulanır. Yedekteki günler aynı anahtarlı günlerin yerine geçer, diğerleri korunur; rutinler değiştirilir. Sonrasında bildirimdeki "Geri al" eski hâle döndürür.

## Yayın durumu
- Depo: https://github.com/omerfarukberber/gunluk-defter (public). `main` dalına push'lanan her şey GitHub Pages'te yayınlanır: https://omerfarukberber.github.io/gunluk-defter/
- Claude'da yayınlanan artifact (claude.ai) ayrı bir kopya; buradaki değişiklikler oraya otomatik gitmez. Artifact verisi Claude hesabında, Pages sürümünün verisi tarayıcıda; aralarında taşımak için JSON yedeği kullanılır.

## Yol haritası (önerilen)
1. ~~GitHub deposu ve ilk commit.~~ Tamam.
2. ~~PWA (manifest + service worker), GitHub Pages ile yayın.~~ Tamam.
3. ~~JSON dışa/içe aktarma.~~ Tamam.
4. İstenirse Tauri ile Windows kurulum dosyası (.exe) ve GitHub Releases.
