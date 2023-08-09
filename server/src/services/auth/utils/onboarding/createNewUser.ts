import defaultSettings from "../../../api/utils/defaults/settings";
import defaultSkills from "../../../api/utils/defaults/skills";
import { defaultBodyAttributes, defaultPerformanceAttributes } from "../../../api/utils/defaults/stats";

const createNewUser = (type: string, info: any, externalProvider?: any): any => {

    let user: any;
    
    if (!info.profile_photo) {
        info.profile_photo = "https://f4.bcbits.com/img/a3226832129_16.jpg";
    }

    if (type === 'player') {
        user = {
            active: false,
            kagwaveId: info.kagwaveId,
            email: info.email,
            email_verified: false,
            password: info.password,
            display_name: info.display_name,
            name: {first_name: info.first_name, last_name: info.last_name},
            profile_photo: info.profile_photo,
            level: 1,
            gender: info.gender,
            complexion: 'default',
            date_of_birth: info.date_of_birth,
            zodiac: info.zodiac,
            sexuality: info.sexuality, 
            lifestyle: info.lifestyle,
            player_color: info.player_color ? info.player_color : 'black',
            main_skill: info.main_skill ? info.main_skill : 'person',
            unlocked_characters: [],
            externalProviderInfo: {},
            xp: {
                total: 0,
            },
            attributes: {
                body: defaultBodyAttributes,
                performance: defaultPerformanceAttributes,//***** */
                rank: 'player',
                degree: 1
            },
            skills: defaultSkills,
            nework: [],
            network_requests: {
                incoming: [],
                outgoing: []
            },
            settings: defaultSettings
        }
    }


    if (externalProvider) {
        user.externalProviderInfo[externalProvider.name] = externalProvider.info
    }


    return user;

}

export default createNewUser;