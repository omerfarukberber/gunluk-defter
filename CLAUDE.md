# Günlük Defter — proje rehberi

Ömer'in kişisel günlük planlayıcısı. Kâğıt defterin yerini alıyor: her sabah günü planlar, işleri sırayla yapar, yaptıkça işaretler. En fazla yarını planlar (uzun vadeli planlama yok).

## İletişim
- Kullanıcıyla Türkçe konuş. Arayüz metinleri Türkçe.
- Uygulama sade kalmalı: yeni bir özellik eklemeden önce gerçekten gerekli mi diye düşün.
- Saati gelen iş için bildirim istenmedi, ekleme.

## Yapı
- Tek dosya: `index.html` (HTML + CSS + JS, çerçeve yok, derleme adımı yok).
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

## Yayın durumu
- Şu an kullanılan sürüm Claude'da yayınlanan artifact (claude.ai). Buradaki değişiklikler oraya otomatik gitmez.

## Yol haritası (önerilen)
1. GitHub deposu ve ilk commit.
2. Claude'dan bağımsız sürüm: PWA (manifest + service worker), GitHub Pages ile yayın. Herkes tarayıcıdan "Uygulamayı yükle" ile kurabilsin.
3. Veriyi taşımak için JSON dışa/içe aktarma.
4. İstenirse Tauri ile Windows kurulum dosyası (.exe) ve GitHub Releases.
