export type memberInfo = {
    title: 'Developer' | 'Artist',
    name: string,
    avatar: string,
    role: string,
    linkedin?: string,
    github?: string,
    artStation?: string
};

export const memberInfosTab: memberInfo[] = [
    {
        title: 'Developer',
        name: '01—Adnan Boudjelal',
        avatar: 'images/teamPhotos/exemple.jpg',
        role: 'FRONTEND DEVELOPMENT /  3D INTEGRATION /  ART & DESIGN DIRECTION /  POST-EFFECTS & SHADERS',
        linkedin: 'https://www.linkedin.com/in/adnan-boudjelal-1b1b3b1b0/',
        github: ''
    },
    {
        title: 'Developer',
        name: '02—Ludivine Novillo',
        avatar: 'images/teamPhotos/exemple.jpg',
        role: 'GAMEPLAY IMPLEMENTATION / 3D INTEGRATION / WEBSOCKET & GAME MECHANICS API / FRONTEND SUPPORT',
        linkedin: 'https://www.linkedin.com/in/ludivine-novillo-7b1b3b1b0/',
        github: ''
    },
    {
        title: 'Developer',
        name: '03—Sid Ahmed Redjini',
        avatar: 'images/teamPhotos/exemple.jpg',
        role: 'DOCKER DEPLOYMENT / DATABASE MANAGEMENT / USER AUTHENTICATION / BACKEND MANAGEMENT',
        linkedin: 'https://www.linkedin.com/in/sid-redjini-8b1b3b1b0/',
        github: '',
    },
    {
        title: 'Developer',
        name: '04—Erick Ngooh',
        avatar: 'images/teamPhotos/exemple.jpg',
        role: 'DOCKER DEPLOYMENT / DATABASE MANAGEMENT / USER AUTHENTICATION / BACKEND MANAGEMENT',
        linkedin: 'https://www.linkedin.com/in/erick-ngooh-7b1b3b1b0/',
        github: ''
    },
    {
        title: 'Artist',
        name: '0?—Vincent Luu',  //special thanks to
        avatar: 'images/teamPhotos/exemple.jpg',
        role: '3D ARTIST',
        artStation: 'https://www.artstation.com/vincentluu',
    },
]; 