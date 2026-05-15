import { useNavigate } from 'react-router-dom';

export const fileSystem = {
    '~': {
        type: 'dir',
        children: {
            'projects': {
                type: 'dir',
                children: {
                    'husky_winter_sports_website.jsx': { 
                        type: 'file', 
                        action: () => window.open("https://www.huskywintersports.org/", '_blank'),
                        desc: "Opening husky_winter_sports_website.jsx..."
                    },
                    'wsdot_project.jsx': { 
                        type: 'file', 
                        action: (navigate) => navigate('/wsdot'), 
                        desc: "Opening WSDOT_Project.jsx..."
                    }
                }
            },
            'resume': {
                type: 'dir',
                children: {
                    'resume.pdf': { 
                        type: 'file', 
                        action: () => window.open('/images/JULIAN_BRAUN_RESUME_N.pdf', '_blank'),
                        desc: "Opening resume.pdf..."
                    },
                    'resume_page.jsx': { 
                        type: 'file', 
                        action: (navigate) => navigate('/resume'),
                        desc: "Opening resume_page.jsx..."
                    }
                }
            },

            'home.jsx': {
                type: 'file',
                action: (navigate) => navigate('/'),
                desc: "Opening home.jsx..."
            }
        }
    }
};

export const findNode = (pathArray) => {
    let current = fileSystem['~'];
    for (let i = 1; i < pathArray.length; i++) {
        if (current.children && current.children[pathArray[i]]) {
            current = current.children[pathArray[i]];
        } else {
            return null;
        }
    }
    return current;
};