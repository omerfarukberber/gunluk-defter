# Günlük Defter — proje rehberi

Ömer'in kişisel günlük planlayıcısı. Kâğıt defterin yerini alıyor: her sabah günü planlar, işleri sırayla yapar, yaptıkça işaretler. En fazla yarını planlar (uzun vadeli planlama yok).

## İletişim
- Kullanıcıyla Türkçe konuş. Arayüz metinleri Türkçe.
- Uygulama sade kalmalı: yeni bir özellik eklemeden önce gerçekten gerekli mi diye düşün.
- Saati gelen iş için bildirim istenmedi, ekleme.

## Yapı
- Uygulama tek dosya: `index.html` (HTML + CSS + JS, çerçeve yok, derleme adımı yok).
- PWA dosyaları: `manifest.webmanifest`, `sw.js`, `icons/`. Yollar göreli olmalı (GitHub Pages `/gunluk-defter/` alt dizininde çalışıyor).
- `sw.js` değişen bir dosyayı yayınlarken `SURUM`'u artır. Sayfa için önce ağ, diğer dosyalar için önce önbellek kullanılır.
- Service worker yalnızca `http(s)` üzerinde ve Claude çerçevesinin dışında kaydedilir.
- Yerel deneme: `python -m http.server 8765` (`.claude/launch.json` içinde `defter` olarak tanımlı).
- Yazı tipi: Schibsted Grotesk (Google Fonts). Renkler `:root` içindeki CSS değişkenlerinde, açık/koyu tema `light-dark()` ile.
- Tasarım dili: beyaz zemin, siyah metin, tek vurgu rengi zümrüt (#00a86b), devreden işler için pembe blok (#ffd6e0). Defter/kâğıt görünümü istenmedi; sade, modern, profesyonel.

## Veri modeli
- Gün belgesi (anahtar `YYYY-AA-GG`): `{ d, tasks: [{id, text, time, done, moved, routine}], carried, ra, note }`
  - `moved`: iş başka güne taşındı. `routine`: hangi rutinden geldiği. `ra`: rutinler o güne eklendi mi. `carried`: dünden kalanlar sorusu cevaplandı mı.
- Ayar belgesi (anahtar `settings`): `{ routines: [{id, text, time}] }`

## Kayıt katmanı
- Önce `localStorage` (`gunluk-defter-v1`, `gunluk-defter-ayar-v1`); her zaman önbellek olarak yazılır.
- Claude artifact içinde çalışırken `window.claude.use("db")` ve `use("user")` ile `data/users/<uid>/` koleksiyonuna da yazar. Bu API Claude dışında yoktur; kod bunu kontrol eder ve yalnızca localStorage ile çalışır.
- `use("desktop")`: Claude masaüstü uygulamasında kurulu sürümde global kısayol (Ctrl+Shift+D), tepsi simgesi ve Dock rozeti. Claude dışında çalışmaz.

## Yedek (JSON)
- Ayarlar > Yedek. Dosya biçimi: `{ uygulama: "gunluk-defter", surum: 1, tarih, days, settings }`.
- İçe aktarmada yedekteki günler aynı anahtarlı günlerin yerine geçer, diğerleri korunur; rutinler değiştirilir. Bildirimdeki "Geri al" eski hâle döndürür. Yalnızca `days` nesnesi (localStorage biçimi) de kabul edilir.

## Yayın durumu
- Depo: https://github.com/omerfarukberber/gunluk-defter (public). `main` dalına push'lanan her şey GitHub Pages'te yayınlanır: https://omerfarukberber.github.io/gunluk-defter/
- Claude'da yayınlanan artifact (claude.ai) ayrı bir kopya; buradaki değişiklikler oraya otomatik gitmez. Artifact verisi Claude hesabında, Pages sürümünün verisi tarayıcıda; aralarında taşımak için JSON yedeği kullanılır.

## Yol haritası (önerilen)
1. ~~GitHub deposu ve ilk commit.~~ Tamam.
2. ~~PWA (manifest + service worker), GitHub Pages ile yayın.~~ Tamam.
3. ~~JSON dışa/içe aktarma.~~ Tamam.
4. İstenirse Tauri ile Windows kurulum dosyası (.exe) ve GitHub Releases.
