import React, { useState } from 'react';
import { CiSearch, CiLocationOn, CiClock2 } from 'react-icons/ci';
import { FiPhone } from 'react-icons/fi';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import { zustandStore } from '../utils/zustandStore';

// TOSHKENtdagi REAL FEEDUP FILIALLARI VA KOORDINATALARI
const branchesData = [
  {
    id: 1,
    name: "FeedUp Chilonzor",
    address: "Toshkent sh., Chilonzor tumani, Qatortol ko'chasi, 60-uy",
    orient: "Qatortol bozori va Parus SM yaqinida",
    phone: "+998 71 200 22 11",
    hours: "09:00 - 03:00",
    coords: [41.285871, 69.215582] // [Kenglik, Uzunlik]
  },
  {
    id: 2,
    name: "FeedUp Yunusobod",
    address: "Toshkent sh., Yunusobod tumani, Amir Temur ko'chasi, 12-uy",
    orient: "Yunusobod bozori va Universam ro'parasi",
    phone: "+998 71 200 22 11",
    hours: "09:00 - 02:45",
    coords: [41.362345, 69.285432]
  },
  {
    id: 3,
    name: "FeedUp Sergeli",
    address: "Toshkent sh., Sergeli tumani, Yangi Sergeli ko'chasi, 5-uy",
    orient: "Sergeli 3-metro bekati yaqinida",
    phone: "+998 71 200 22 11",
    hours: "09:00 - 01:00",
    coords: [41.225678, 69.221234]
  },
  {
    id: 4,
    name: "FeedUp Buyuk Ipak Yo'li",
    address: "Toshkent sh., Mirzo Ulug'bek tumani, B.I.Y ko'chasi, 45-uy",
    orient: "Buyuk Ipak Yo'li (Maksim Gorkiy) metrosi",
    phone: "+998 71 200 22 11",
    hours: "09:00 - 03:00",
    coords: [41.325432, 69.327654]
  }
];

export default function Branches() {
  const [searchTerm, setSearchTerm] = useState('');
  const { darkMode } = zustandStore();
  // Dastlab ro'yxatdagi birinchi filial tanlangan holatda turadi
  const [selectedBranch, setSelectedBranch] = useState(branchesData[0]);

  // Qidiruv maydoni uchun filtrlash funksiyasi
  const filteredBranches = branchesData.filter(branch =>
    branch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    branch.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      paddingTop: '80px',
      minHeight: '100vh',
      background: darkMode ? '#1a1a1a' : '#f9f9f9',
      color: darkMode ? '#fff' : '#111',
      transition: 'background 0.3s, color 0.3s',
      padding: '40px 16px'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Sarlavha va Qidiruv Maydoni */}
        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          alignItems: window.innerWidth < 768 ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <div>
            <h1 style={{
              fontSize: 32,
              fontWeight: 900,
              color: darkMode ? '#fff' : '#111',
              lineHeight: 1.2
            }}>
              Bizning filiallarimiz 📍
            </h1>
            <p style={{
              fontSize: 14,
              color: darkMode ? '#888' : '#999',
              marginTop: '4px'
            }}>
              O'zingizga qulay FeedUp restoranini Yandex xaritadan toping
            </p>
          </div>
          
          {/* Qidiruv Inputi */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '320px' }}>
            <input
              type="text"
              placeholder="Filial yoki manzilni yozing..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: darkMode ? '#2a2a2a' : '#fff',
                color: darkMode ? '#fff' : '#333',
                border: darkMode ? '1px solid #444' : '1px solid #e0e0e0',
                borderRadius: '999px',
                paddingLeft: '44px',
                paddingRight: '16px',
                paddingTop: '12px',
                paddingBottom: '12px',
                fontSize: '14px',
                outline: 'none',
                transition: 'all 0.2s'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#e8000e';
                e.target.style.boxShadow = '0 0 0 1px #e8000e';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = darkMode ? '#444' : '#e0e0e0';
                e.target.style.boxShadow = 'none';
              }}
            />
            <CiSearch style={{
              position: 'absolute',
              left: '16px',
              top: '14px',
              fontSize: '20px',
              color: darkMode ? '#666' : '#999'
            }} />
          </div>
        </div>

        {/* Ro'yxat va Xarita Grid tartibi */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth >= 1024 ? '1fr 1.5fr' : '1fr',
          gap: '32px',
          height: window.innerWidth >= 1024 ? '600px' : 'auto'
        }}>
          
          {/* CHAP TOMON: Filiallar ro'yxati (Scroll bo'ladigan qism) */}
          <div style={{
            background: darkMode ? '#2a2a2a' : '#fff',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: `0 2px 8px rgba(0,0,0,${darkMode ? '0.3' : '0.08'})`,
            border: darkMode ? '1px solid #333' : '1px solid #f0f0f0',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            height: '100%'
          }}>
            {filteredBranches.length > 0 ? (
              filteredBranches.map((branch) => (
                <div
                  key={branch.id}
                  onClick={() => setSelectedBranch(branch)}
                  style={{
                    padding: '20px',
                    borderRadius: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: selectedBranch.id === branch.id ? '1px solid #e8000e' : darkMode ? '1px solid #333' : '1px solid #f0f0f0',
                    background: selectedBranch.id === branch.id
                      ? darkMode ? 'rgba(232, 0, 14, 0.2)' : 'rgba(232, 0, 14, 0.05)'
                      : darkMode ? '#333' : '#f9f9f9',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedBranch.id !== branch.id) {
                      e.currentTarget.style.background = darkMode ? '#3a3a3a' : '#f0f0f0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedBranch.id !== branch.id) {
                      e.currentTarget.style.background = darkMode ? '#333' : '#f9f9f9';
                    }
                  }}
                >
                  
              
                  <h3 style={{
                    fontWeight: 900,
                    fontSize: 18,
                    color: darkMode ? '#fff' : '#111',
                    marginBottom: 8
                  }}>
                    {branch.name}
                  </h3>
                  
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    fontSize: 14,
                    color: darkMode ? '#aaa' : '#666',
                    marginBottom: 12
                  }}>
                    <CiLocationOn style={{
                      fontSize: 20,
                      color: '#e8000e',
                      flexShrink: 0,
                      marginTop: 4
                    }} />
                    <div>
                      <p style={{ fontWeight: 600 }}>{branch.address}</p>
                      <span style={{
                        fontSize: 12,
                        color: darkMode ? '#777' : '#999',
                        display: 'block',
                        marginTop: 4
                      }}>
                        Mo'ljal: {branch.orient}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    fontSize: 12,
                    color: darkMode ? '#888' : '#666',
                    borderTop: darkMode ? '1px solid #444' : '1px solid #eee',
                    paddingTop: 8
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <CiClock2 style={{
                        fontSize: 16,
                        color: darkMode ? '#666' : '#999'
                      }} />
                      {branch.hours}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <FiPhone style={{
                        color: darkMode ? '#666' : '#999'
                      }} />
                      {branch.phone}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                paddingTop: 80,
                paddingBottom: 80,
                color: darkMode ? '#666' : '#999',
                fontWeight: 600
              }}>
                Qidiruvga mos filial topilmadi 😕
              </div>
            )}
          </div>

          {/* O'NG TOMON: Haqiqiy Yandex Map */}
          <div style={{
            background: darkMode ? '#2a2a2a' : '#fff',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: `0 2px 8px rgba(0,0,0,${darkMode ? '0.3' : '0.08'})`,
            border: darkMode ? '1px solid #333' : '1px solid #f0f0f0',
            height: '100%',
            position: 'relative',
            zIndex: 10
          }}>
            <YMaps query={{ lang: 'uz_UZ' }}>
              <Map 
                state={{ center: selectedBranch.coords, zoom: 15 }} 
                width="100%" 
                height="100%"
                modules={["control.ZoomControl", "control.FullscreenControl"]}
              >
                {/* Barcha filial belgilarini xaritaga chiqarish */}
                {branchesData.map(b => (
                  <Placemark 
                    key={b.id} 
                    geometry={b.coords} 
                    properties={{ balloonContent: b.name }}
                    options={{
                      // Hozir tanlangan filial qizil, qolganlari kulrang taom ikonkasida bo'ladi
                      preset: b.id === selectedBranch.id ? 'islands#redFoodIcon' : 'islands#grayFoodIcon'
                    }}
                  />
                ))}
              </Map>
            </YMaps>

            {/* Xarita ustidagi ma'lumotlar paneli (Faqat kompyuterlar uchun) */}
            {window.innerWidth >= 768 && (
              <div style={{
                position: 'absolute',
                top: 16,
                left: 16,
                background: darkMode ? 'rgba(42, 42, 42, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(12px)',
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 20,
                paddingRight: 20,
                borderRadius: 12,
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                border: darkMode ? '1px solid #444' : '1px solid #eee',
                maxWidth: '400px',
                zIndex: 20
              }}>
                <span style={{
                  fontSize: 10,
                  background: '#e8000e',
                  color: '#fff',
                  fontWeight: 900,
                  paddingLeft: 8,
                  paddingRight: 8,
                  paddingTop: 4,
                  paddingBottom: 2,
                  borderRadius: 999,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Hozir tanlangan
                </span>
                <h4 style={{
                  fontWeight: 900,
                  color: darkMode ? '#fff' : '#111',
                  fontSize: 16,
                  marginTop: 4
                }}>
                  {selectedBranch.name}
                </h4>
                <p style={{
                  fontSize: 12,
                  color: darkMode ? '#888' : '#999',
                  marginTop: 4
                }}>
                  {selectedBranch.address}
                </p>
              </div>
            )}

            {/* Telefon (Mobil) versiya uchun pastki panel */}
            {window.innerWidth < 768 && (
              <div style={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                right: 16,
                background: darkMode ? 'rgba(42, 42, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(12px)',
                padding: 16,
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                border: darkMode ? '1px solid #444' : '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 20
              }}>
                <div>
                  <h4 style={{
                    fontWeight: 700,
                    fontSize: 14,
                    color: darkMode ? '#fff' : '#111'
                  }}>
                    {selectedBranch.name}
                  </h4>
                  <p style={{
                    fontSize: 12,
                    color: darkMode ? '#888' : '#999',
                    marginTop: 4
                  }}>
                    Ish vaqti: {selectedBranch.hours}
                  </p>
                </div>
                <a 
                  href={`tel:${selectedBranch.phone}`}
                  style={{
                    fontSize: 12,
                    background: '#e8000e',
                    color: '#fff',
                    fontWeight: 700,
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 16,
                    paddingRight: 16,
                    borderRadius: '8px',
                    transition: 'background 0.2s',
                    textDecoration: 'none',
                    display: 'block',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#c0000b'}
                  onMouseLeave={(e) => e.target.style.background = '#e8000e'}
                >
                  Qo'ng'iroq
                </a>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
