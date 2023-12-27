import revival from '../media/images/album-art/revival.jpg'
import parabola from '../media/images/album-art/parabola.png'
import eclipse from '../media/images/album-art/eclipse.png'
import horizon from '../media/images/album-art/horizon.png';
import boof from '../media/images/album-art/boof.jpeg';


const music = {
  fibonacci: {
    main: [
    {
        albumTitle: 'Eclipse',
        type: 'EP',
        albumImg: eclipse,
        year: '2020',    
        tracklist: [ 
          {title: "3300", audioSrc: 'https://audio.jukehost.co.uk/KfpMRqHO5djsUA23xd4wnOb90JiL4xvc'}, 
          {title: "Serious", audioSrc: 'https://audio.jukehost.co.uk/lY1OM5JDMSs8h605XEuIg6VdrFUHqeX4'},
          {title: "Interpretation ft. Swindail", audioSrc: 'https://audio.jukehost.co.uk/AszqCFMBM4VHXZfLHsSuYIDnIoHNtjxN'},
          {title: "Enchanted", audioSrc: 'https://audio.jukehost.co.uk/xw0dfwOKT1VJLNYjIT2f4ww6vI1h0kxW'},
          {title: "Closer", audioSrc: 'https://audio.jukehost.co.uk/WSfSqGUtCL0FdM2sEKby5WZPmOvATRl8'},
          {title: "Not ft. Josh Pan", audioSrc: 'https://audio.jukehost.co.uk/g7eqrCpqg9CgquxPjq0YEcNT0IX85zSm'},
          {title: "Know Why", audioSrc: 'https://audio.jukehost.co.uk/u86mPsFVq8SkNoZ0svgm0hzZQVDTSQSg'},
          {title: "Careful", audioSrc: 'https://audio.jukehost.co.uk/j53FxNIPcV9tnr5AhM8aVZmlyHp7KuEf'}
        ],
        desc: "Album info",
        links: {
            soundcloud: 'http://soundcloud.com/kagwe/sets/eclipse',
            spotify: 'https://open.spotify.com/album/1s2PaR80LReonuvSqHNynC',
            bandcamp: 'https://kagwe.bandcamp.com/album/eclipse',
            applemusic: 'https://music.apple.com/us/album/eclipse/1536762359',
            youtube: 'https://music.youtube.com/playlist?list=OLAK5uy_mZ2fc4mLqy_gF8s7DeRUMgvBokJebgM7M'
        },
        emoji: "🌑",
        specs: {
            version: '1.0',
            lastUpdate: '10.20.2020'
        }
    },
    {
        albumTitle: 'Horizon',
        type: 'EP',
        albumImg: horizon,
        year: '2019',      
        tracklist: [ 
          {title: "Afterglow ft. J. Roosevelt", audioSrc: ''},
          {title: "New Episode!", audioSrc: ''},
          {title: "Experimenting,", audioSrc: ''},
          {title: "Five Guys", audioSrc: ''},
          {title: "I Found Her", audioSrc: ''}
        ],
        desc: "Album info",
        links: {
            bandcamp: 'https://kagwe.bandcamp.com/album/horizon',
        },
        emoji:"☀️",
        specs: {
            version: '1.0',
            lastUpdate: '10.20.2019'
        }
    },
    {
        albumTitle: 'Boof',
        type: 'EP',
        albumImg: boof,
        year: '2018',
        tracklist: [
          {title: "Gabe Being Gabe", audioSrc: ''},
          {title: "Boofboy", audioSrc: ''},
          {title: "Kick The Pinecone", audioSrc: ''}
        ],
        desc: "Album info",
        links: {
            bandcamp: 'https://kagwe.bandcamp.com/album/boof',
        },
        emoji: "💭",
        specs: {
            version: '1.0',
            lastUpdate: '10.20.2018'
        }
    },
    {
        albumTitle: 'Parabola',
        type: 'EP',
        albumImg: parabola,
        year: '2018',     
        tracklist: [
          {title: "Flowt", audioSrc: ''},
          {title: "Strange Thoughts", audioSrc: ''}
        ],
        desc: "Album info",
        links: {
            bandcamp: 'https://kagwe.bandcamp.com/album/parabola',
        },
        version:"1.1",
        emoji: "📖",
        specs: {
            version: '1.0',
            lastUpdate: '10.20.2018'
        }
    },
    {
        albumTitle: 'Rev!val',
        type: 'single',
        albumImg: revival,
        year: '2022',
        tracklist: [
          {title: "Revival", audioSrc: ''}
        ],
        desc: "Album info",
        links: {
            soundcloud: 'https://soundcloud.com/kagwe/revival',
            spotify: 'https://open.spotify.com/album/09OUQVaTWkIDuZOObsM0q3',
            bandcamp: 'https://kagwe.bandcamp.com/track/rev-val',
            applemusic: 'https://music.apple.com/us/album/revival-single/1608097172?at=1001lbRT&ct=1119106&uo=4&app=music',
            youtube: 'https://www.youtube.com/watch?v=jCqw3JXTJsk'
        },
        emoji: "",
        specs: {
            version: '1.5',
            lastUpdate: '02.08.2022'
        }
    }],

    singles: [
    {
        title: 'Halftab',
        albumImg: 'https://f4.bcbits.com/img/a4104423599_16.jpg',
        year: '2020',      
        desc: "Album info",
        links: {
            fanlink: 'http://fanlink.to/halftab'
        }
    },
    {
        title: 'Tides',
        albumImg: 'https://f4.bcbits.com/img/a0982762587_16.jpg',
        year: '2019',      
        desc: "Album info",
        links: {
            fanlink: 'http://fanlink.to/tides1_0'
        }
    },
    {
        title: 'Quicksand...',
        albumImg: 'https://f4.bcbits.com/img/a1904313662_10.jpg',
        year: '2018',      
        desc: "Album info",
        links: {
            fanlink: 'http://fanlink.to/quicksand_'
        }
    },
    {
        title: 'Orbiting Souls',
        albumImg: 'https://f4.bcbits.com/img/a3825406870_16.jpg',
        year: '2018',      
        desc: "Album info",
        links: {
            fanlink: 'http://fanlink.to/orbitingsouls'
        }
    },
    {
        title: 'Felt',
        albumImg: 'https://f4.bcbits.com/img/a1645260464_2.jpg',
        year: '2017',      
        desc: "Album info",
        links: {
            fanlink: 'http://fanlink.to/feltbykagwe'
        }
    },
    {
        title: 'MissBliss!',
        albumImg: 'https://f4.bcbits.com/img/a0265347065_16.jpg',
        year: '2017',      
        desc: "Album info",
        links: {
            fanlink: 'http://fanlink.to/missbliss'
        }
    },
    {
        title: 'Well..',
        albumImg: 'https://f4.bcbits.com/img/a2331809484_10.jpg',
        year: '2016',      
        desc: "Album info",
        links: {
            fanlink: 'http://fanlink.to/well'
        }
    },
    {
        title: 'It May Rain Sometimes',
        albumImg: 'https://i1.sndcdn.com/artworks-000165426236-jma51e-t500x500.jpg',
        year: '2016',      
        desc: "Album info",
        links: {
            fanlink: 'http://fanlink.to/itmayrainsometimes'
        }
    },
    ]}
};

export default music;
