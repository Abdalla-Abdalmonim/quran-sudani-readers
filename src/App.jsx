import React, { useEffect, useMemo, useRef, useState } from 'react'
import { BookOpen, Bookmark, ChevronLeft, Headphones, Heart, Menu, Moon, Pause, Play, Search, Sun, X } from 'lucide-react'
import { readers, surahs } from './data'

const STORAGE_KEY = 'quraa-sudan-bookmarks'

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [query, setQuery] = useState('')
  const [selectedSurah, setSelectedSurah] = useState(surahs[0])
  const [selectedReader, setSelectedReader] = useState(readers[0])
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    } catch {
      return []
    }
  })
  const [isDark, setIsDark] = useState(() => localStorage.getItem('quraa-sudan-dark') === 'true')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [ayahs, setAyahs] = useState([])
  const [mobileMenu, setMobileMenu] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks))
  }, [bookmarks])

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
    localStorage.setItem('quraa-sudan-dark', String(isDark))
  }, [isDark])

  useEffect(() => {
    let ignore = false
    setIsLoading(true)
    fetch(`https://api.alquran.cloud/v1/surah/${selectedSurah.id}`)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load surah')
        return response.json()
      })
      .then((json) => {
        if (!ignore) {
          setAyahs(json?.data?.ayahs || [])
        }
      })
      .catch(() => {
        if (!ignore) setAyahs([])
      })
      .finally(() => {
        if (!ignore) setIsLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [selectedSurah.id])

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.pause()
    setIsPlaying(false)
  }, [selectedSurah.id, selectedReader.id])

  const filteredSurahs = useMemo(() => {
    const value = query.trim()
    if (!value) return surahs
    return surahs.filter((surah) => surah.name.includes(value) || String(surah.id) === value)
  }, [query])

  const currentVerses = ayahs.length > 0 ? ayahs : []

  const isBookmarked = (ayahNum) => bookmarks.some(
    (item) => item.surahId === selectedSurah.id && item.ayahNum === ayahNum,
  )

  const toggleBookmark = (ayahNum, ayahText) => {
    setBookmarks((current) => {
      const exists = current.some((item) => item.surahId === selectedSurah.id && item.ayahNum === ayahNum)
      return exists
        ? current.filter((item) => !(item.surahId === selectedSurah.id && item.ayahNum === ayahNum))
        : [...current, { surahId: selectedSurah.id, surah: selectedSurah.name, ayahNum, ayahText }]
    })
  }

  const chooseSurah = (surah) => {
    setSelectedSurah(surah)
    setActiveTab('read')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const buildAudioUrl = () => {
    const base = selectedReader?.audioBase?.replace(/\/$/, '')
    if (!base) return ''
    return `${base}/${String(selectedSurah.id).padStart(3, '0')}.mp3`
  }

  const play = async () => {
    const url = buildAudioUrl()
    if (!url || !audioRef.current) return
    if (audioRef.current.src !== url) {
      audioRef.current.src = url
    }
    try {
      await audioRef.current.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

  const togglePlayback = () => {
    if (!audioRef.current) return
    if (audioRef.current.paused) {
      play()
    } else {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="app-shell">
      <header className="header">
        <div className="container header-inner">
          <button className="mobile-menu" onClick={() => setMobileMenu(!mobileMenu)} aria-label="القائمة"><Menu size={22} /></button>
          <a className="brand" href="#home" onClick={() => setActiveTab('home')}>
            <span className="brand-icon">ق</span>
            <span><strong>قراء السودان</strong><small>صوتٌ يحيي القلب</small></span>
          </a>
          <nav className={mobileMenu ? 'nav open' : 'nav'}>
            {[['home', 'الرئيسية'], ['read', 'المصحف'], ['readers', 'القراء'], ['bookmarks', 'المحفوظات']].map(([id, label]) => (
              <button className={activeTab === id ? 'nav-link active' : 'nav-link'} key={id} onClick={() => { setActiveTab(id); setMobileMenu(false) }}>{label}</button>
            ))}
          </nav>
          <button className="icon-button" onClick={() => setIsDark(!isDark)} aria-label="تبديل المظهر">{isDark ? <Sun size={20} /> : <Moon size={20} />}</button>
        </div>
      </header>

      <main id="home">
        {activeTab === 'home' && (
          <section className="hero container">
            <div className="hero-copy">
              <span className="eyebrow"><span className="pulse" /> تلاوة • تدبر • سكينة</span>
              <h1>استمع إلى القرآن الكريم <em>بأصوات سودانية</em></h1>
              <p>منصة عربية تتيح لك قراءة القرآن الكريم واستماع جميع الآيات مع أصوات القراء المشهورين.</p>
              <div className="hero-actions">
                <button className="button primary" onClick={() => setActiveTab('read')}><BookOpen size={18} /> ابدأ القراءة</button>
                <button className="button soft" onClick={() => setActiveTab('readers')}><Headphones size={18} /> استكشف القراء</button>
              </div>
              <div className="trust"><span>١١٤</span> سورة <i /> <span>كل الآيات</span> <i /> <span>٦ قراء</span></div>
            </div>
            <div className="hero-art">
              <div className="ornament">۞</div>
              <div className="hero-quote">وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا<small>المزمل: ٤</small></div>
              <div className="hero-badge">
                <Headphones size={18} />
                <span><b>استمع الآن</b><small>تلاوة هادئة للقلب</small></span>
                <Play size={16} fill="currentColor" />
              </div>
            </div>
          </section>
        )}

        {(activeTab === 'read' || activeTab === 'home') && (
          <section className="container workspace" id="read">
            <div className="section-heading">
              <div>
                <span className="eyebrow">المصحف الشريف</span>
                <h2>اختر سورة وابدأ التلاوة</h2>
              </div>
              <div className="search">
                <Search size={18} />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن سورة..." />
              </div>
            </div>

            <div className="reader-layout">
              <aside className="surah-sidebar">
                <div className="sidebar-title">
                  <strong>السور</strong>
                  <span>{filteredSurahs.length} سورة</span>
                </div>
                <div className="surah-list">
                  {filteredSurahs.map((surah) => (
                    <button key={surah.id} className={selectedSurah.id === surah.id ? 'surah-row selected' : 'surah-row'} onClick={() => chooseSurah(surah)}>
                      <span className="surah-no">{surah.id}</span>
                      <span>
                        <b>{surah.name}</b>
                        <small>{surah.type} • {surah.verses} آية</small>
                      </span>
                      <ChevronLeft size={16} />
                    </button>
                  ))}
                </div>
              </aside>

              <section className="quran-card">
                <div className="quran-top">
                  <div>
                    <span className="eyebrow">سورة {selectedSurah.type}</span>
                    <h2>{selectedSurah.name}</h2>
                    <small>{selectedSurah.verses} آية • الجزء {selectedSurah.juz || 1}</small>
                  </div>
                  <div className="select-wrap">
                    <label>القارئ</label>
                    <select value={selectedReader.id} onChange={(e) => setSelectedReader(readers.find((r) => r.id === Number(e.target.value)))}>
                      {readers.map((reader) => (
                        <option key={reader.id} value={reader.id}>{reader.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="basmala">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>

                <div className="ayah-list">
                  {isLoading ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#738096' }}>جارٍ تحميل الآيات...</div>
                  ) : currentVerses.length > 0 ? (
                    currentVerses.map((ayah, index) => (
                      <article className="ayah" key={index}>
                        <span className="ayah-number">{ayah.numberInSurah}</span>
                        <p>{ayah.text}</p>
                        <button className={isBookmarked(ayah.numberInSurah) ? 'bookmark saved' : 'bookmark'} onClick={() => toggleBookmark(ayah.numberInSurah, ayah.text)} aria-label="حفظ الآية">
                          {isBookmarked(ayah.numberInSurah) ? <Bookmark size={19} fill="currentColor" /> : <Bookmark size={19} />}
                        </button>
                      </article>
                    ))
                  ) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#738096' }}>لم يتمكن من تحميل الآيات</div>
                  )}
                </div>

                <div className="player">
                  <div className="player-info">
                    <div className="reader-avatar">{selectedReader.name[0]}</div>
                    <span><b>{selectedReader.name}</b><small>{selectedSurah.name}</small></span>
                  </div>
                  <button className="play-button" onClick={togglePlayback}>{isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}</button>
                  <div className="player-progress">
                    <div />
                    <small>التلاوة الصوتية</small>
                  </div>
                  <audio ref={audioRef} onEnded={() => setIsPlaying(false)} onPause={() => setIsPlaying(false)} />
                </div>
              </section>
            </div>
          </section>
        )}

        {activeTab === 'readers' && (
          <section className="container page-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">أصوات من السودان</span>
                <h2>القراء المميزون</h2>
              </div>
            </div>
            <div className="reader-cards">
              {readers.map((reader) => (
                <article className="reader-card" key={reader.id}>
                  <div className="reader-card-top">
                    <div className="large-avatar">{reader.name[0]}</div>
                    <span className="verified">✓ موثوق</span>
                  </div>
                  <h3>{reader.name}</h3>
                  <p>{reader.bio}</p>
                  <small>{reader.city} • {reader.style}</small>
                  <button className="button primary full" onClick={() => { setSelectedReader(reader); setActiveTab('read') }}>
                    <Headphones size={17} /> استمع إلى التلاوة
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'bookmarks' && (
          <section className="container page-section">
            <div className="section-heading">
              <div>
                <span className="eyebrow">آياتك المفضلة</span>
                <h2>المحفوظات</h2>
              </div>
            </div>
            {bookmarks.length ? (
              <div className="bookmark-grid">
                {bookmarks.map((item, index) => (
                  <article className="bookmark-card" key={`${item.surahId}-${item.ayahNum}-${index}`}>
                    <span>سورة {item.surah}</span>
                    <p>{item.ayahText}</p>
                    <button onClick={() => toggleBookmark(item.ayahNum, item.ayahText)}><X size={17} /> إزالة</button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty">
                <Heart size={34} />
                <h3>لم تحفظ أي آية بعد</h3>
                <p>اضغط على علامة الحفظ بجانب أي آية لتجدها هنا.</p>
                <button className="button primary" onClick={() => setActiveTab('read')}>اذهب إلى المصحف</button>
              </div>
            )}
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="container">
          <strong>قراء السودان</strong>
          <span>اللهم اجعل القرآن ربيع قلوبنا ونور صدورنا</span>
          <small>© 2026 • مشروع مفتوح لخدمة كتاب الله</small>
        </div>
      </footer>
    </div>
  )
}

export default App
