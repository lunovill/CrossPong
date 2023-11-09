export type memberInfo = {
    title: 'Developer' | 'Artist',
    name: string,
    avatar: string,
    role: string,
    linkedin: string,
    github?: string,
    artStation?: string
};

export const memberInfosTab: memberInfo[] = [
    {
        title: 'Developer',
        name: '01—Adnan Boudjelal',
        avatar: 'images/teamPhotos/adn.png',
        role: 'FRONTEND DEVELOPMENT /  3D INTEGRATION & ANIMATION /  ART & DESIGN DIRECTION / UX & UI',
        linkedin: 'https://www.linkedin.com/in/adnan-boudjelal-07b709216/',
        github: 'https://github.com/pandamanxv3'
    },
    {
        title: 'Developer',
        name: '02—Ludivine Novillo',
        avatar: 'images/teamPhotos/ludi.png',
        role: 'GAMEPLAY IMPLEMENTATION / 3D INTEGRATION /  GAME MECHANICS  / FRONTEND SUPPORT',
        linkedin: 'https://www.linkedin.com/',
        github: 'https://github.com/lunovill'
    },
	{
        title: 'Artist',
        name: '03—Vincent Luu',  
        avatar: 'images/teamPhotos/vincent.png',
        role: '3D ARTIST / ASSET OPTIMIZATION / CREATIVE DIRECTION SUPPORT',
		linkedin: 'https://www.linkedin.com/in/vincent-d-luu-382a8823a/',
        artStation: 'https://www.artstation.com/luuvincent',
    }
]; 