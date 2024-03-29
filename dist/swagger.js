"use strict";
const swaggerAutogen = require('swagger-autogen');
const doc = {
    info: {
        title: 'Bishopric Tools API',
        description: 'The Bishopric Tools API is a RESTful API that allows users to interact with a database containing information about ward and stake members and calling propositions. It provides endpoints for creating, retrieving, updating, and deleting wards, stakes, members, and propositions.',
    },
    host: 'bishopric-tools.onrender.com',
    schemes: ['https'],
    definitions: {
        Proposition: {
            $memberId: '649345be812b4a3f37335cf6',
            $callingId: '649345be812b4a3f37335cf7',
            leaderApproval: true,
            contactedOn: '2002-12-09',
            interviewDate: '2002-12-15',
            interviewed: true,
            accepted: true,
            sustainedOn: '2002-12-30',
            setApart: '2002-12-30',
            realeasedOn: '2003-05-09',
        },
        Calling: {
            $name: 'Bishop',
            $organizationId: '6493923060042c532a58a084',
        },
        Ward: {
            $name: 'Midvale 11th',
            $stakeId: '64b763f9afc286d42818dcf7',
        },
        Member: {
            $firstName: 'John',
            $lastName: 'Doe',
            email: 'john.doe@gmail.com',
            password: 'ahashedpassword',
            admin: true,
            ageGroup: 'Adult',
            wardId: '6493925960042c532a58a087',
            organizations: [
                '649345be812b4a3f37335cf6',
                '649345be812b4a3f37335cf8',
                '649345be812b4a3f37335cf9',
                '649345be812b4a3f37335cfb',
            ],
        },
        Stake: {
            $name: 'Paris East',
        },
    },
    securityDefinitions: {
        oAuthSample: {
            type: 'oauth2',
            authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
            tokenUrl: 'https://www.googleapis.com/oauth2/v4/token',
            flow: 'implicit',
            scopes: {
                'https://www.googleapis.com/auth/userinfo.profile': 'All user operations requiring authentication.',
            },
        },
    },
};
const outputFile = './swagger-output.json';
const endpointsFiles = [
    './routes/callings.ts',
    './routes/members.ts',
    './routes/propositions.ts',
    './routes/wards.ts',
    './routes/stakes.ts',
];
swaggerAutogen()(outputFile, endpointsFiles, doc);
