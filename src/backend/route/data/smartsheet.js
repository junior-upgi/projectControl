import express from 'express';
import httpRequest from 'request-promise';
/*
const moment = require('moment-timezone');
const Treeize = require('treeize');
const uuidV4 = require('uuid/v4');
*/
import { smartsheetToken, smartsheetUrl } from '../../serverConfig.js';
import { endpointErrorHandler } from '../../utility.js';
// const utility = require('../../utility.js');
import tokenValidation from '../../middleware/tokenValidation.js';

const router = express.Router();

router.route('/data/smartsheet/sheets')
    .all(tokenValidation)
    .get((request, response, next) => {
        httpRequest({
            method: 'get',
            uri: `${smartsheetUrl}/sheets`,
            headers: {
                'Authorization': smartsheetToken
            }
        }).then((apiResponse) => {
            return response.status(200).json({ sheets: JSON.parse(apiResponse) });
        }).catch((error) => {
            return response.status(500).json(
                endpointErrorHandler(
                    request.method,
                    request.originalUrl,
                    'smartsheet sheets data request failed'
                )
            );
        });
    });

module.exports = router;
