'use client';

import { useState } from 'react';

export default function SolarSystemSection() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const planets = [
    {
      name: 'Merkurius',
      desc: 'Planet terkecil dan terdekat dengan Matahari.',
      size: 'w-6 h-6',
      orbitSize: 'w-[150px] h-[150px]',
      duration: '8s',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnWYRUNv3hOYnNTSd8V52y-z3aCD9y1ksKUnA8Jzcjm-uBAerl-azBHDjeNBKf_he0bOm1yTyeTWiUULGjoLgGS4wZDq-KKgSC20gp7cKhWWmIQPJOkBkLcTXttMU_NT0Ylci0JONS0Q_Wx_obXuH-AseoYv6_xIZK-Awlc14auO9qH1rhorp9quzra3B78ccJ2FqrqMbkMaBG2_AhTLogrje0btAuVrGro4aJADdcTsZIOmMvU6o',
      link: '#planet-merkurius',
    },
    {
      name: 'Venus',
      desc: 'Planet terpanas di tata surya kita karena atmosfernya yang tebal.',
      size: 'w-8 h-8',
      orbitSize: 'w-[220px] h-[220px]',
      duration: '12s',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD188NRXM0GF31_ybRWhlwd0b4FYt6-P5HQx5gqyfxAajLrnfAY9bsGt0tpcVv7uKPodpY13rPdoNIF9Jw7CUC1w12nsbceah_3m-Eufc1BplyCjTiZvDiyqGN4jVaywUmQVnNnMl0iCs_0LwXd_mPDVXmh2p5IKOvOlPgLgkYrz2RMz232GGU5_TIqIM5fIOrWrWDGdxK6POmMLkIU0G0GCPMOdRf_JCf3IDnx28F60USvD0cM9Y',
      link: '#planet-venus',
    },
    {
      name: 'Bumi',
      desc: 'Satu-satunya planet yang diketahui memiliki kehidupan.',
      size: 'w-10 h-10',
      orbitSize: 'w-[320px] h-[320px]',
      duration: '18s',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdxQOOXtG4k0q0iOuwx4G1YPVo7GSlFxtVc4_8ubJIW8796wYXlXJfMoqIGneQd6X0K2_r_XiG3ZrjAKEWtBVKpAIDs95o2CK-gFejVwd_-nqZp0OviZorx4YxpDbgxDrA8suAvw-XTx6GdVnPwn9JhG1-RpNLNK1aDyRanxF_8PZox8wUe1iUy6NlXs-FZbaquoxJV4VYOtoQVzy1LFERf5Afce6RwUqp-6QIe8pO9Kz9Or1g_vI',
      link: '#planet-bumi',
    },
    {
      name: 'Mars',
      desc: 'Sering disebut Planet Merah, target utama eksplorasi manusia masa depan.',
      size: 'w-8 h-8',
      orbitSize: 'w-[420px] h-[420px]',
      duration: '24s',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCc1dK3m-7oYuS2VC9VY5ejmrNNRIBb8cGkoY_gY3ufjnf3IFXkld2WXnEmZO6zJUXY9RQeNsD6DClS9B3aNc96L-mOF6VwuzO7yFbkNnlFxzQ-bXQ-kKMz23xl0j9EkmTtJqU08G8VOEDLH77Go07hRb9Iw983XxB5uSZNeyI_2zEYuQw1TbVyA64oHe4do9XVuLmSgou9iiGbQFyXpIoCuG-lvCUooD5SLdR2DjVnY8y_5oiqXKM',
      link: '#planet-mars',
    },
    {
      name: 'Jupiter',
      desc: 'Planet terbesar di tata surya kita, raksasa gas dengan badai dahsyat.',
      size: 'w-20 h-20',
      orbitSize: 'w-[560px] h-[560px]',
      duration: '40s',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDweaPDjrYKxUI6bh4BXp7jtCZmp_kmVPnliZW4jxR2eqWw0IbKQSDkqjzKVpOEYs6I_3vSt0NcnMTo0R5CIbY2cMAChzFd8AGkvPEtZSPczaPpRsRVi-1VEaEETYeLbFYTWDo08cLmlUzEWg-tWCMWqy2IWBI8-lahnK8ngNzfpEgK_brJEJZDlqvfATdUMEyatrJhhzmYD0RuE3rbcAZqJkybpDpgg-iRA7Uysx298MSZVTqcnZk',
      link: '#planet-jupiter',
    },
    {
      name: 'Saturnus',
      desc: 'Terkenal dengan sistem cincinnya yang menakjubkan dan kompleks.',
      size: 'w-28 h-28',
      orbitSize: 'w-[720px] h-[720px]',
      duration: '60s',
      isRing: true,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqIU0DeWXofMFwpOzC9PV2a8oqKdG4aQskgCV_mQjS-Qw8KVEEhjcBUhMAJc5VQ6PN7yQ9FoxlmYgKENcS-a_vbkSEdghTlbn0AHm0nF28SnQ9qotZehktUt4LbFM8eVWEb16AdezjMpVthQxFUIGlLErsCbruJFSm0i88K9D_fe3aQEzo5aSKreYH6OuffsVH00Mvd_K_3uKDZddk1eXqGKDMZT6BChmE5tQrCsMcorlstA9Vv-k',
      link: '#planet-saturnus',
    },
    {
      name: 'Uranus',
      desc: 'Raksasa es yang berputar pada sisinya.',
      size: 'w-14 h-14',
      orbitSize: 'w-[900px] h-[900px]',
      duration: '85s',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDV-QrhmNz3mZUfJBjXpyUI2psjgcXfIUHTjWCetm0E1SCMWZh5bdmCtuf4VjI66ArvsE0CJaTcx0iAZh2or8NvQHC0u9d5pKH_LxStHCzQrJEDIYw8_QGEPsAlSBS8JzuPO4iUQjOt7HZl7D7ECEdg0phEB87Fw7_bENctT7URYKWj1I7OeiSjSG26UjJS0GD3N5wfYvOVDJTey7l5TMXQQqLbIOT0Tppa8_XvVglZPv20ZJYfYzQ',
      link: '#planet-uranus',
    },
    {
      name: 'Neptunus',
      desc: 'Planet terjauh, dunia es biru gelap yang sangat berangin.',
      size: 'w-14 h-14',
      orbitSize: 'w-[1050px] h-[1050px]',
      duration: '110s',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI_W2hh61CP7nquDZ4q1l7eybmcItLPpRBGniwmG_-hVw-snR_nnBdXAGE1kN98IXelrfM4Owz3fWDMjpOKk8fTh76wl4ZTLZuqSuvDzbXoUV8kYhba2Z3zht38RdtH_F97_AfO6IMSCgMWmv2vAat8D0TAYMFhFAmrcLe14SdcLap9-FX3VmxGm2mdCrr-Z423xnRwDLylZ-25x2TytHdQws2n7wmT9-3qxulpWGgYWQcuckloSE',
      link: '#planet-neptunus',
    },
  ];

  return (
    <section className="py-24 px-6 max-w-[1280px] mx-auto" id="tata-surya">
      <div className="text-left mb-16">
        <h2 className="font-['Sora'] text-3xl font-bold text-[#22D3EE] mb-4">Tata Surya Kita</h2>
        <p className="text-[#ffffff] font-['Hanken_Grotesk']">Sebuah tarian kosmik yang mengelilingi bintang induk kita.</p>
      </div>

      <div className="relative w-full h-[800px] overflow-hidden rounded-xl bg-[#0F0F14] starfield-bg flex items-center justify-center border border-[#22D3EE]/30">
        {/* Sun */}
        <div className="absolute w-40 h-40 z-10 flex items-center justify-center">
          <img
            alt="Matahari"
            className="w-full h-full object-cover rounded-full shadow-[0_0_80px_rgba(255,225,109,0.8)]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbPdB5PMIl98e7h0z7hHukR_yd6VAr8UQPzrHW92gGLd10waZ3lBKL3e7HWbWsCeqHi9CCrOAzqbdfk8pqJQzxRI8sU6Mji467S9ZYG2pfeaXeWxXDyxokguYCXo9CrPD0NG9c7RqzC3yp3as-bB5eecByDcK8YCRv5F-CYohpYs276pb4rzyVIKKWDFdv8SXpCjKhg2HTvP_LX9gd9FawL17CrpICTRbFjCfek64iln_z7civxWg"
          />
        </div>

        {/* Orbit Lines & Planets */}
        {planets.map((planet, idx) => (
          <div
            key={idx}
            className={`orbit-path ${planet.orbitSize} animate-orbit`}
            style={{ animationDuration: planet.duration }}
          >
            <div
              className={`planet-container ${planet.size} group cursor-pointer hover:scale-125 transition-transform`}
              onClick={() => setSelectedPlanet(planet)}
            >
              <img
                alt={planet.name}
                className={`w-full h-full ${planet.isRing ? 'object-contain scale-[1.5]' : 'object-cover rounded-full border border-[#22D3EE]/50'}`}
                src={planet.img}
                style={{ animation: `orbit ${planet.duration} linear infinite reverse` }}
              />
            </div>
          </div>
        ))}

        {/* Planet Info Modal Card */}
        {selectedPlanet && (
          <div className="absolute bottom-8 right-8 z-50 bg-[#0F0F14] p-6 rounded-xl border border-[#22D3EE]/30 shadow-2xl max-w-sm">
            <button
              className="absolute top-4 right-4 text-[#ffffff] hover:text-[#22D3EE] transition-colors"
              onClick={() => setSelectedPlanet(null)}
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
            <h3 className="font-['Sora'] text-2xl text-[#FFFFFF] mb-2 font-bold">{selectedPlanet.name}</h3>
            <p className="font-['Hanken_Grotesk'] text-base text-[#ffffff] mb-6 min-h-[48px]">
              {selectedPlanet.desc}
            </p>
            <a
              className="inline-flex items-center gap-2 bg-transparent text-[#22D3EE] border border-[#22D3EE] px-4 py-2 rounded font-['Geist'] text-sm transition-colors w-full justify-center hover:bg-[#22D3EE]/10"
              href={selectedPlanet.link}
            >
              Pelajari Lebih Lanjut
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
