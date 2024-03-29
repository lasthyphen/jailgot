import fetch from 'cross-fetch';
import { hexlify, arrayify } from '@ethersproject/bytes';
import { Interface } from '@ethersproject/abi';
import { Contract } from '@ethersproject/contracts';
import { hash, normalize } from '@ensdomains/eth-ens-namehash';
import { jsonToGraphQLQuery } from 'json-to-graphql-query';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import set from 'lodash.set';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { verifyTypedData } from '@ethersproject/wallet';
import { _TypedDataEncoder } from '@ethersproject/hash';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var spaceTypes = {
    Space: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'settings', type: 'string' }
    ]
};
var proposalTypes = {
    Proposal: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'type', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'body', type: 'string' },
        { name: 'discussion', type: 'string' },
        { name: 'choices', type: 'string[]' },
        { name: 'start', type: 'uint64' },
        { name: 'end', type: 'uint64' },
        { name: 'snapshot', type: 'uint64' },
        { name: 'plugins', type: 'string' },
        { name: 'app', type: 'string' }
    ]
};
var cancelProposalTypes = {
    CancelProposal: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'string' }
    ]
};
var cancelProposal2Types = {
    CancelProposal: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'bytes32' }
    ]
};
var voteTypes = {
    Vote: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'string' },
        { name: 'choice', type: 'uint32' },
        { name: 'reason', type: 'string' },
        { name: 'app', type: 'string' }
    ]
};
var voteArrayTypes = {
    Vote: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'string' },
        { name: 'choice', type: 'uint32[]' },
        { name: 'reason', type: 'string' },
        { name: 'app', type: 'string' }
    ]
};
var voteStringTypes = {
    Vote: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'string' },
        { name: 'choice', type: 'string' },
        { name: 'reason', type: 'string' },
        { name: 'app', type: 'string' }
    ]
};
var vote2Types = {
    Vote: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'bytes32' },
        { name: 'choice', type: 'uint32' },
        { name: 'reason', type: 'string' },
        { name: 'app', type: 'string' }
    ]
};
var voteArray2Types = {
    Vote: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'bytes32' },
        { name: 'choice', type: 'uint32[]' },
        { name: 'reason', type: 'string' },
        { name: 'app', type: 'string' }
    ]
};
var voteString2Types = {
    Vote: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'proposal', type: 'bytes32' },
        { name: 'choice', type: 'string' },
        { name: 'reason', type: 'string' },
        { name: 'app', type: 'string' }
    ]
};
var followTypes = {
    Follow: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' }
    ]
};
var unfollowTypes = {
    Unfollow: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' }
    ]
};
var subscribeTypes = {
    Subscribe: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' }
    ]
};
var unsubscribeTypes = {
    Unsubscribe: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' }
    ]
};
var profileTypes = {
    Profile: [
        { name: 'from', type: 'address' },
        { name: 'timestamp', type: 'uint64' },
        { name: 'profile', type: 'string' }
    ]
};
var aliasTypes = {
    Alias: [
        { name: 'from', type: 'address' },
        { name: 'alias', type: 'address' }
    ]
};
var deleteSpaceType = {
    DeleteSpace: [
        { name: 'from', type: 'address' },
        { name: 'space', type: 'string' }
    ]
};

var hubs = [
	"https://hub.snapshot.org",
	"https://testnet.snapshot.org"
];

var NAME = 'snapshot';
var VERSION = '0.1.4';
var domain = {
    name: NAME,
    version: VERSION
    // chainId: 1
};
var Client = /** @class */ (function () {
    function Client(address) {
        if (address === void 0) { address = hubs[0]; }
        this.address = address;
    }
    Client.prototype.sign = function (web3, address, message, types) {
        return __awaiter(this, void 0, void 0, function () {
            var signer, data, sig;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        signer = (web3 === null || web3 === void 0 ? void 0 : web3.getSigner) ? web3.getSigner() : web3;
                        if (!message.from)
                            message.from = address;
                        if (!message.timestamp)
                            message.timestamp = parseInt((Date.now() / 1e3).toFixed());
                        data = { domain: domain, types: types, message: message };
                        return [4 /*yield*/, signer._signTypedData(domain, data.types, message)];
                    case 1:
                        sig = _a.sent();
                        console.log('Sign', { address: address, sig: sig, data: data });
                        return [4 /*yield*/, this.send({ address: address, sig: sig, data: data })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.send = function (envelop) {
        return __awaiter(this, void 0, void 0, function () {
            var url, init;
            return __generator(this, function (_a) {
                url = this.address + "/api/msg";
                init = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(envelop)
                };
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        fetch(url, init)
                            .then(function (res) {
                            if (res.ok)
                                return resolve(res.json());
                            throw res;
                        })
                            .catch(function (e) { return e.json().then(function (json) { return reject(json); }); });
                    })];
            });
        });
    };
    Client.prototype.space = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, spaceTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.proposal = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!message.discussion)
                            message.discussion = '';
                        if (!message.app)
                            message.app = '';
                        return [4 /*yield*/, this.sign(web3, address, message, proposalTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.cancelProposal = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            var type2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type2 = message.proposal.startsWith('0x');
                        return [4 /*yield*/, this.sign(web3, address, message, type2 ? cancelProposal2Types : cancelProposalTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.vote = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            var type2, type;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!message.reason)
                            message.reason = '';
                        if (!message.app)
                            message.app = '';
                        type2 = message.proposal.startsWith('0x');
                        type = type2 ? vote2Types : voteTypes;
                        if (['approval', 'ranked-choice'].includes(message.type))
                            type = type2 ? voteArray2Types : voteArrayTypes;
                        if (['quadratic', 'weighted'].includes(message.type)) {
                            type = type2 ? voteString2Types : voteStringTypes;
                            message.choice = JSON.stringify(message.choice);
                        }
                        if ((message === null || message === void 0 ? void 0 : message.privacy) === 'shutter')
                            type = type2 ? voteString2Types : voteStringTypes;
                        delete message.privacy;
                        delete message.type;
                        return [4 /*yield*/, this.sign(web3, address, message, type)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.follow = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, followTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.unfollow = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, unfollowTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.subscribe = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, subscribeTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.unsubscribe = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, unsubscribeTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.profile = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, profileTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.alias = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, aliasTypes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.deleteSpace = function (web3, address, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sign(web3, address, message, deleteSpaceType)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Client;
}());

function signMessage(web3, msg, address) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    msg = hexlify(new Buffer(msg, 'utf8'));
                    return [4 /*yield*/, web3.send('personal_sign', [msg, address])];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getBlockNumber(provider) {
    return __awaiter(this, void 0, void 0, function () {
        var blockNumber, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, provider.getBlockNumber()];
                case 1:
                    blockNumber = _a.sent();
                    return [2 /*return*/, parseInt(blockNumber)];
                case 2:
                    e_1 = _a.sent();
                    return [2 /*return*/, Promise.reject()];
                case 3: return [2 /*return*/];
            }
        });
    });
}

var version = "0.1.3";

var Client$1 = /** @class */ (function () {
    function Client(address) {
        if (address === void 0) { address = hubs[0]; }
        this.address = address;
    }
    Client.prototype.request = function (command, body) {
        var url = this.address + "/api/" + command;
        var init;
        if (body) {
            init = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            };
        }
        return new Promise(function (resolve, reject) {
            fetch(url, init)
                .then(function (res) {
                if (res.ok)
                    return resolve(res.json());
                throw res;
            })
                .catch(function (e) { return e.json().then(function (json) { return reject(json); }); });
        });
    };
    Client.prototype.send = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('message', msg)];
            });
        });
    };
    Client.prototype.getSpaces = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.request('spaces')];
            });
        });
    };
    Client.prototype.broadcast = function (web3, account, space, type, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        msg = {
                            address: account,
                            msg: JSON.stringify({
                                version: version,
                                timestamp: (Date.now() / 1e3).toFixed(),
                                space: space,
                                type: type,
                                payload: payload
                            })
                        };
                        _a = msg;
                        return [4 /*yield*/, signMessage(web3, msg.msg, account)];
                    case 1:
                        _a.sig = _b.sent();
                        return [4 /*yield*/, this.send(msg)];
                    case 2: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Client.prototype.sign = function (web3, account, space, type, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var msg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = {
                            address: account,
                            msg: JSON.stringify({
                                version: version,
                                timestamp: (Date.now() / 1e3).toFixed(),
                                space: space,
                                type: type,
                                payload: payload
                            })
                        };
                        return [4 /*yield*/, signMessage(web3, msg.msg, account)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.vote = function (web3, address, space, _a) {
        var proposal = _a.proposal, choice = _a.choice;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.broadcast(web3, address, space, 'vote', {
                        proposal: proposal,
                        choice: choice
                    })];
            });
        });
    };
    Client.prototype.proposal = function (web3, address, space, _a) {
        var name = _a.name, body = _a.body, _b = _a.discussion, discussion = _b === void 0 ? '' : _b, choices = _a.choices, start = _a.start, end = _a.end, snapshot = _a.snapshot, _c = _a.type, type = _c === void 0 ? 'single-choice' : _c, _d = _a.metadata, metadata = _d === void 0 ? {} : _d;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_e) {
                return [2 /*return*/, this.broadcast(web3, address, space, 'proposal', {
                        name: name,
                        body: body,
                        discussion: discussion,
                        choices: choices,
                        start: start,
                        end: end,
                        snapshot: snapshot,
                        type: type,
                        metadata: metadata
                    })];
            });
        });
    };
    Client.prototype.deleteProposal = function (web3, address, space, _a) {
        var proposal = _a.proposal;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, this.broadcast(web3, address, space, 'delete-proposal', {
                        proposal: proposal
                    })];
            });
        });
    };
    Client.prototype.settings = function (web3, address, space, settings) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.broadcast(web3, address, space, 'settings', settings)];
            });
        });
    };
    return Client;
}());

var $schema = "http://json-schema.org/draft-07/schema#";
var $ref = "#/definitions/Space";
var definitions = {
	Space: {
		title: "Space",
		type: "object",
		properties: {
			name: {
				type: "string",
				title: "name",
				minLength: 1,
				maxLength: 32
			},
			"private": {
				type: "boolean"
			},
			about: {
				type: "string",
				title: "about",
				maxLength: 160
			},
			guidelines: {
				type: "string",
				title: "guidelines",
				maxLength: 1024
			},
			terms: {
				type: "string",
				title: "terms",
				format: "uri",
				maxLength: 128
			},
			avatar: {
				type: "string",
				title: "avatar",
				format: "uri",
				maxLength: 256
			},
			location: {
				type: "string",
				title: "location",
				maxLength: 24
			},
			website: {
				type: "string",
				title: "website",
				format: "url",
				maxLength: 128
			},
			twitter: {
				type: "string",
				title: "twitter",
				pattern: "^[A-Za-z0-9_]*$",
				maxLength: 15
			},
			github: {
				type: "string",
				title: "github",
				pattern: "^[A-Za-z0-9_-]*$",
				maxLength: 39
			},
			email: {
				type: "string",
				title: "email",
				maxLength: 32
			},
			network: {
				type: "string",
				title: "network",
				minLength: 1,
				maxLength: 32
			},
			symbol: {
				type: "string",
				title: "symbol",
				minLength: 1,
				maxLength: 16
			},
			skin: {
				type: "string",
				title: "skin",
				maxLength: 32
			},
			domain: {
				type: "string",
				title: "domain",
				maxLength: 64
			},
			strategies: {
				type: "array",
				minItems: 1,
				maxItems: 8,
				items: {
					type: "object",
					properties: {
						name: {
							type: "string",
							maxLength: 64,
							title: "name"
						},
						network: {
							type: "string",
							maxLength: 12,
							title: "network"
						},
						params: {
							type: "object",
							title: "params"
						}
					},
					required: [
						"name"
					],
					additionalProperties: false
				},
				title: "strategies"
			},
			members: {
				type: "array",
				maxItems: 100,
				items: {
					type: "string",
					pattern: "^0x[a-fA-F0-9]{40}$",
					minLength: 42,
					maxLength: 42
				},
				title: "members",
				uniqueItems: true
			},
			admins: {
				type: "array",
				maxItems: 100,
				items: {
					type: "string",
					pattern: "^0x[a-fA-F0-9]{40}$",
					minLength: 42,
					maxLength: 42
				},
				title: "admins",
				uniqueItems: true
			},
			filters: {
				type: "object",
				properties: {
					defaultTab: {
						type: "string"
					},
					minScore: {
						type: "number",
						minimum: 0
					},
					onlyMembers: {
						type: "boolean"
					},
					invalids: {
						type: "array",
						items: {
							type: "string",
							maxLength: 64
						},
						title: "invalids"
					}
				},
				additionalProperties: false
			},
			validation: {
				type: "object",
				properties: {
					name: {
						type: "string",
						maxLength: 64,
						title: "name"
					},
					params: {
						type: "object",
						title: "params"
					}
				},
				required: [
					"name"
				],
				additionalProperties: false
			},
			voteValidation: {
				type: "object",
				properties: {
					name: {
						type: "string",
						maxLength: 32,
						title: "name"
					},
					params: {
						type: "object",
						title: "params"
					}
				},
				required: [
					"name"
				],
				additionalProperties: false
			},
			followValidation: {
				type: "object",
				properties: {
					name: {
						type: "string",
						maxLength: 32,
						title: "name"
					},
					params: {
						type: "object",
						title: "params"
					}
				},
				required: [
					"name"
				],
				additionalProperties: false
			},
			delegation: {
				type: "boolean"
			},
			allowAlias: {
				type: "boolean"
			},
			plugins: {
				type: "object"
			},
			voting: {
				type: "object",
				properties: {
					delay: {
						type: "integer",
						minimum: 0
					},
					period: {
						type: "integer",
						minimum: 0
					},
					type: {
						type: "string",
						title: "type"
					},
					quorum: {
						type: "number",
						minimum: 0
					},
					blind: {
						type: "boolean"
					},
					hideAbstain: {
						type: "boolean"
					},
					privacy: {
						type: "string",
						"enum": [
							"",
							"shutter"
						]
					}
				},
				additionalProperties: false
			},
			categories: {
				type: "array",
				maxItems: 2,
				items: {
					type: "string",
					"enum": [
						"protocol",
						"social",
						"investment",
						"grant",
						"service",
						"media",
						"creator",
						"collector"
					]
				}
			},
			treasuries: {
				type: "array",
				maxItems: 10,
				items: {
					type: "object",
					properties: {
						name: {
							type: "string",
							title: "Name",
							examples: [
								"e.g. Balancer DAO 1"
							],
							minLength: 1,
							maxLength: 64
						},
						address: {
							type: "string",
							title: "Contract address",
							examples: [
								"e.g. 0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984"
							],
							pattern: "^0x[a-fA-F0-9]{40}$",
							minLength: 42,
							maxLength: 42
						},
						network: {
							type: "string",
							title: "Network",
							maxLength: 12
						}
					},
					required: [
						"name",
						"address",
						"network"
					],
					additionalProperties: false
				}
			},
			parent: {
				type: "string",
				title: "parent"
			},
			children: {
				type: "array",
				maxItems: 8,
				title: "children",
				items: {
					type: "string"
				}
			}
		},
		required: [
			"name",
			"network",
			"symbol",
			"strategies"
		],
		additionalProperties: false
	}
};
var space = {
	$schema: $schema,
	$ref: $ref,
	definitions: definitions
};

var $schema$1 = "http://json-schema.org/draft-07/schema#";
var $ref$1 = "#/definitions/Proposal";
var definitions$1 = {
	Proposal: {
		title: "Proposal",
		type: "object",
		properties: {
			name: {
				type: "string",
				title: "name",
				minLength: 1,
				maxLength: 256
			},
			body: {
				type: "string",
				title: "body",
				minLength: 0,
				maxLength: 14400
			},
			discussion: {
				type: "string",
				format: "customUrl",
				title: "discussion",
				maxLength: 256
			},
			choices: {
				type: "array",
				title: "choices",
				minItems: 1,
				maxItems: 200
			},
			type: {
				type: "string",
				"enum": [
					"single-choice",
					"approval",
					"ranked-choice",
					"quadratic",
					"weighted",
					"custom",
					"basic"
				]
			},
			snapshot: {
				type: "number",
				title: "snapshot"
			},
			start: {
				type: "number",
				title: "start",
				minimum: 1000000000,
				maximum: 2000000000
			},
			end: {
				type: "number",
				title: "end",
				minimum: 1000000000,
				maximum: 2000000000,
				exclusiveMinimum: {
					$data: "1/start"
				}
			},
			metadata: {
				type: "object",
				title: "metadata"
			},
			app: {
				type: "string",
				title: "app",
				maxLength: 24
			}
		},
		required: [
			"name",
			"body",
			"choices",
			"snapshot",
			"start",
			"end"
		],
		additionalProperties: false
	}
};
var proposal = {
	$schema: $schema$1,
	$ref: $ref$1,
	definitions: definitions$1
};

var $schema$2 = "http://json-schema.org/draft-07/schema#";
var $ref$2 = "#/definitions/Vote";
var definitions$2 = {
	Vote: {
		title: "Vote",
		type: "object",
		properties: {
			proposal: {
				type: "string",
				title: "proposal"
			},
			choice: {
				type: [
					"number",
					"array",
					"object",
					"boolean",
					"string"
				],
				title: "choice"
			},
			metadata: {
				type: "object",
				title: "metadata"
			},
			reason: {
				type: "string",
				title: "reason",
				maxLength: 140
			},
			app: {
				type: "string",
				title: "app",
				maxLength: 24
			}
		},
		required: [
			"proposal",
			"choice"
		],
		additionalProperties: false
	}
};
var vote = {
	$schema: $schema$2,
	$ref: $ref$2,
	definitions: definitions$2
};

var $schema$3 = "http://json-schema.org/draft-07/schema#";
var $ref$3 = "#/definitions/Profile";
var definitions$3 = {
	Profile: {
		title: "Profile",
		type: "object",
		properties: {
			name: {
				type: "string",
				title: "name",
				maxLength: 32
			},
			about: {
				type: "string",
				title: "about",
				maxLength: 256
			},
			avatar: {
				type: "string",
				title: "avatar",
				format: "customUrl",
				maxLength: 256
			}
		},
		required: [
		],
		additionalProperties: false
	}
};
var profile = {
	$schema: $schema$3,
	$ref: $ref$3,
	definitions: definitions$3
};

var $schema$4 = "http://json-schema.org/draft-07/schema#";
var $ref$4 = "#/definitions/Zodiac";
var definitions$4 = {
	Zodiac: {
		title: "Zodiac",
		type: "object",
		properties: {
			safes: {
				title: "Safe(s)",
				type: "array",
				maxItems: 8,
				items: {
					type: "object",
					properties: {
						network: {
							title: "Network",
							type: "string"
						},
						multisend: {
							title: "Multisend contract address",
							type: "string"
						},
						realityAddress: {
							title: "Reality module address",
							type: "string"
						},
						umaAddress: {
							title: "UMA module address",
							type: "string"
						}
					},
					additionalProperties: false
				}
			},
			additionalProperties: false
		}
	}
};
var zodiac = {
	$schema: $schema$4,
	$ref: $ref$4,
	definitions: definitions$4
};

var schemas = {
    space: space.definitions.Space,
    proposal: proposal.definitions.Proposal,
    vote: vote.definitions.Vote,
    profile: profile.definitions.Profile,
    zodiac: zodiac.definitions.Zodiac
};

var Multicaller = /** @class */ (function () {
    function Multicaller(network, provider, abi, options) {
        this.options = {};
        this.calls = [];
        this.paths = [];
        this.network = network;
        this.provider = provider;
        this.abi = abi;
        this.options = options || {};
    }
    Multicaller.prototype.call = function (path, address, fn, params) {
        this.calls.push([address, fn, params]);
        this.paths.push(path);
        return this;
    };
    Multicaller.prototype.execute = function (from) {
        return __awaiter(this, void 0, void 0, function () {
            var obj, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        obj = from || {};
                        return [4 /*yield*/, multicall(this.network, this.provider, this.abi, this.calls, this.options)];
                    case 1:
                        result = _a.sent();
                        result.forEach(function (r, i) { return set(obj, _this.paths[i], r.length > 1 ? r : r[0]); });
                        this.calls = [];
                        this.paths = [];
                        return [2 /*return*/, obj];
                }
            });
        });
    };
    return Multicaller;
}());

function getSnapshots(network, snapshot, provider, networks) {
    return __awaiter(this, void 0, void 0, function () {
        var snapshots, networkIn, block, query, url, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    snapshots = {};
                    networks.forEach(function (n) { return (snapshots[n] = 'latest'); });
                    if (snapshot === 'latest')
                        return [2 /*return*/, snapshots];
                    snapshots[network] = snapshot;
                    networkIn = Object.keys(snapshots).filter(function (s) { return network !== s; });
                    if (networkIn.length === 0)
                        return [2 /*return*/, snapshots];
                    return [4 /*yield*/, provider.getBlock(snapshot)];
                case 1:
                    block = _a.sent();
                    query = {
                        blocks: {
                            __args: {
                                where: {
                                    ts: block.timestamp,
                                    network_in: networkIn
                                }
                            },
                            network: true,
                            number: true
                        }
                    };
                    url = 'https://blockfinder.snapshot.org';
                    return [4 /*yield*/, subgraphRequest(url, query)];
                case 2:
                    data = _a.sent();
                    data.blocks.forEach(function (block) { return (snapshots[block.network] = block.number); });
                    return [2 /*return*/, snapshots];
            }
        });
    });
}

var providers = {};
function getProvider(network) {
    var url = "https://brovider.xyz/" + network;
    if (!providers[network])
        providers[network] = new StaticJsonRpcProvider({ url: url, timeout: 25000 });
    return providers[network];
}

function validate(author, space, proposal, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var strategies, onlyMembers, minScore, members, scores, totalScore;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    strategies = options.strategies || space.strategies;
                    onlyMembers = options.onlyMembers || ((_a = space.filters) === null || _a === void 0 ? void 0 : _a.onlyMembers);
                    minScore = options.minScore || ((_b = space.filters) === null || _b === void 0 ? void 0 : _b.minScore);
                    members = (space.members || []).map(function (address) { return address.toLowerCase(); });
                    if (members.includes(author.toLowerCase()))
                        return [2 /*return*/, true];
                    if (onlyMembers)
                        return [2 /*return*/, false];
                    if (!minScore) return [3 /*break*/, 2];
                    return [4 /*yield*/, getScores(space.id || space.key, strategies, space.network, [author])];
                case 1:
                    scores = _c.sent();
                    totalScore = scores
                        .map(function (score) { return Object.values(score).reduce(function (a, b) { return a + b; }, 0); })
                        .reduce(function (a, b) { return a + b; }, 0);
                    if (totalScore < minScore)
                        return [2 /*return*/, false];
                    _c.label = 2;
                case 2: return [2 /*return*/, true];
            }
        });
    });
}

/**
 * Aave Space Validation proposal validation uses:
 *  - Proposition power of GovernanceStrategy contract
 *  - Other active Aave Snapshot voting strategies
 *
 * The current validation implementation mutates the "strategies" field of the space
 * to be able to use proposition power instead of voting power for "aave-governance-power".
 *
 */
function validate$1(author, space, proposal, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var onlyMembers, minScore, members, strategies, aaveGovernanceStrategyIndex, scores, totalScore;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    onlyMembers = options.onlyMembers || ((_a = space.filters) === null || _a === void 0 ? void 0 : _a.onlyMembers);
                    minScore = options.minScore || ((_b = space.filters) === null || _b === void 0 ? void 0 : _b.minScore);
                    members = (space.members || []).map(function (address) { return address.toLowerCase(); });
                    strategies = __spread(space.strategies);
                    aaveGovernanceStrategyIndex = strategies.findIndex(function (_a) {
                        var name = _a.name;
                        return name === 'aave-governance-power';
                    });
                    // Use the proposition power instead of voting power
                    if (aaveGovernanceStrategyIndex >= 0) {
                        strategies[aaveGovernanceStrategyIndex].params.powerType = 'proposition';
                    }
                    if (members.includes(author.toLowerCase()))
                        return [2 /*return*/, true];
                    if (onlyMembers)
                        return [2 /*return*/, false];
                    if (!minScore) return [3 /*break*/, 2];
                    return [4 /*yield*/, getScores(space.id || space.key, strategies, space.network, [author])];
                case 1:
                    scores = _c.sent();
                    totalScore = scores
                        .map(function (score) { return Object.values(score).reduce(function (a, b) { return a + b; }, 0); })
                        .reduce(function (a, b) { return a + b; }, 0);
                    if (totalScore < minScore)
                        return [2 /*return*/, false];
                    _c.label = 2;
                case 2: return [2 /*return*/, true];
            }
        });
    });
}

/**
 * Nouns Space Validation proposal validation uses:
 *
 * The current validation implementation mutates the "strategies" field of the space
 * to be able to use proposition power instead of voting power for "nouns-rfp-power".
 *
 */
function validate$2(author, space, proposal, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function () {
        var onlyMembers, minScore, members, strategies, nounsRFPStrategyIndex, scores, totalScore;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    onlyMembers = options.onlyMembers || ((_a = space.filters) === null || _a === void 0 ? void 0 : _a.onlyMembers);
                    minScore = options.minScore || ((_b = space.filters) === null || _b === void 0 ? void 0 : _b.minScore);
                    members = (space.members || []).map(function (address) { return address.toLowerCase(); });
                    strategies = __spread(space.strategies);
                    nounsRFPStrategyIndex = strategies.findIndex(function (_a) {
                        var name = _a.name;
                        return name === 'nouns-rfp-power';
                    });
                    // Use the proposition power instead of the voting power
                    if (nounsRFPStrategyIndex >= 0) {
                        strategies[nounsRFPStrategyIndex].params.powerType = 'proposition';
                    }
                    if (members.includes(author.toLowerCase()))
                        return [2 /*return*/, true];
                    if (onlyMembers)
                        return [2 /*return*/, false];
                    if (!minScore) return [3 /*break*/, 2];
                    return [4 /*yield*/, getScores(space.id || space.key, strategies, space.network, [author])];
                case 1:
                    scores = _c.sent();
                    totalScore = scores
                        .map(function (score) { return Object.values(score).reduce(function (a, b) { return a + b; }, 0); })
                        .reduce(function (a, b) { return a + b; }, 0);
                    if (totalScore < minScore)
                        return [2 /*return*/, false];
                    _c.label = 2;
                case 2: return [2 /*return*/, true];
            }
        });
    });
}

function validate$3(author, space, proposal, options) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var onlyMembers, members, _b, propEntryStart, _c, propEntryEnd, now, startTime, endTime;
        return __generator(this, function (_d) {
            onlyMembers = options.onlyMembers || ((_a = space.filters) === null || _a === void 0 ? void 0 : _a.onlyMembers);
            members = (space.members || []).map(function (address) { return address.toLowerCase(); });
            _b = options.propEntryStart, propEntryStart = _b === void 0 ? 0 : _b, _c = options.propEntryEnd, propEntryEnd = _c === void 0 ? 0 : _c;
            if (!propEntryStart || !propEntryEnd || propEntryStart >= propEntryEnd)
                return [2 /*return*/, false];
            if (members.includes(author.toLowerCase()))
                return [2 /*return*/, true];
            if (onlyMembers)
                return [2 /*return*/, false];
            now = new Date().getTime();
            startTime = new Date(propEntryStart).getTime();
            endTime = new Date(propEntryEnd).getTime();
            // Only allow proposals being submitted in this time window.
            if (now >= startTime && now <= endTime) {
                return [2 /*return*/, true];
            }
            return [2 /*return*/, false];
        });
    });
}

var validations = {
    basic: validate,
    aave: validate$1,
    nouns: validate$2,
    timeperiod: validate$3
};

function verifyDefault(address, sig, hash, provider) {
    return __awaiter(this, void 0, void 0, function () {
        var returnValue, magicValue, abi, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    magicValue = '0x1626ba7e';
                    abi = 'function isValidSignature(bytes32 _hash, bytes memory _signature) public view returns (bytes4 magicValue)';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, call(provider, [abi], [address, 'isValidSignature', [arrayify(hash), sig]])];
                case 2:
                    returnValue = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.log(e_1);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/, returnValue.toLowerCase() === magicValue.toLowerCase()];
            }
        });
    });
}
function verifyOldVersion(address, sig, hash, provider) {
    return __awaiter(this, void 0, void 0, function () {
        var returnValue, magicValue, abi, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    magicValue = '0x20c13b0b';
                    abi = 'function isValidSignature(bytes _hash, bytes memory _signature) public view returns (bytes4 magicValue)';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, call(provider, [abi], [address, 'isValidSignature', [arrayify(hash), sig]])];
                case 2:
                    returnValue = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _a.sent();
                    console.log(e_2);
                    return [2 /*return*/, false];
                case 4: return [2 /*return*/, returnValue.toLowerCase() === magicValue.toLowerCase()];
            }
        });
    });
}
function verify(address, sig, hash, network) {
    if (network === void 0) { network = '1'; }
    return __awaiter(this, void 0, void 0, function () {
        var provider;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = getProvider(network);
                    return [4 /*yield*/, verifyDefault(address, sig, hash, provider)];
                case 1:
                    if (_a.sent())
                        return [2 /*return*/, true];
                    return [4 /*yield*/, verifyOldVersion(address, sig, hash, provider)];
                case 2: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

function getHash(data) {
    var domain = data.domain, types = data.types, message = data.message;
    return _TypedDataEncoder.hash(domain, types, message);
}
function verify$1(address, sig, data, network) {
    if (network === void 0) { network = '1'; }
    return __awaiter(this, void 0, void 0, function () {
        var domain, types, message, hash, recoverAddress;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    domain = data.domain, types = data.types, message = data.message;
                    hash = getHash(data);
                    console.log('Hash', hash);
                    console.log('Address', address);
                    try {
                        recoverAddress = verifyTypedData(domain, types, message, sig);
                        console.log('Recover address', recoverAddress);
                        if (address === recoverAddress)
                            return [2 /*return*/, true];
                    }
                    catch (e) {
                        console.log('Could not recoverAddress:' + e.message);
                    }
                    console.log('Check EIP1271 signature');
                    return [4 /*yield*/, verify(address, sig, hash, network)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}

var gateways = [
	"cloudflare-ipfs.com",
	"cf-ipfs.com",
	"ipfs.io",
	"ipfs.fleek.co",
	"gateway.pinata.cloud",
	"dweb.link",
	"ipfs.infura.io"
];

var networks = {
	"1": {
	key: "1",
	name: "Ethereum Mainnet",
	chainId: 1,
	network: "homestead",
	multicall: "0xeefba1e63905ef1d7acba5a8513c70307c1ce441",
	ensResolver: "0x4976fb03C32e5B8cfe2b6cCB31c09Ba78EBaBa41",
	rpc: [
		"https://rpc.ankr.com/eth",
		{
			url: "https://api-geth-archive.ankr.com",
			user: "balancer_user",
			password: "balancerAnkr20201015"
		},
		"https://speedy-nodes-nyc.moralis.io/b9aed21e7bb7bdeb35972c9a/eth/mainnet/archive",
		"https://apis.ankr.com/e62bc219f9c9462b8749defe472d2dc5/6106d4a3ec1d1bcc87ec72158f8fd089/eth/archive/main",
		"https://eth-archival.gateway.pokt.network/v1/5f76124fb90218002e9ce985",
		"https://eth-mainnet.alchemyapi.io/v2/4bdDVB5QAaorY2UE-GBUbM2yQB3QJqzv"
	],
	light: [
		"https://cloudflare-eth.com"
	],
	ws: [
		"wss://eth-mainnet.ws.alchemyapi.io/v2/4bdDVB5QAaorY2UE-GBUbM2yQB3QJqzv"
	],
	explorer: "https://etherscan.io",
	start: 7929876,
	logo: "ipfs://QmR2UYZczmYa4s8mr9HZHci5AQwyAnwUW7tSUZz7KWF3sA"
},
	"3": {
	key: "3",
	name: "Ethereum Testnet Ropsten",
	shortName: "Ropsten",
	chainId: 3,
	network: "ropsten",
	testnet: true,
	multicall: "0x53c43764255c17bd724f74c4ef150724ac50a3ed",
	rpc: [
		"https://eth-ropsten.alchemyapi.io/v2/QzGz6gdkpTyDzebi3PjxIaKO7bDTGnSy"
	],
	explorer: "https://ropsten.etherscan.io",
	start: 7980811,
	logo: "ipfs://QmR2UYZczmYa4s8mr9HZHci5AQwyAnwUW7tSUZz7KWF3sA"
},
	"4": {
	key: "4",
	name: "Ethereum Testnet Rinkeby",
	shortName: "Rinkeby",
	chainId: 4,
	network: "rinkeby",
	testnet: true,
	multicall: "0x42ad527de7d4e9d9d011ac45b31d8551f8fe9821",
	ensResolver: "0xf6305c19e814d2a75429fd637d01f7ee0e77d615",
	rpc: [
		"https://eth-rinkeby.alchemyapi.io/v2/ugiPEBqMebLQbjro42kalZ1h4StpW_fR",
		"https://eth-rinkeby.gateway.pokt.network/v1/5f76124fb90218002e9ce985"
	],
	ws: [
		"wss://eth-rinkeby.ws.alchemyapi.io/v2/twReQE9Px03E-E_N_Fbb3OVF7YgHxoGq"
	],
	explorer: "https://rinkeby.etherscan.io",
	start: 4534725,
	logo: "ipfs://QmR2UYZczmYa4s8mr9HZHci5AQwyAnwUW7tSUZz7KWF3sA"
},
	"5": {
	key: "5",
	name: "Ethereum Testnet Görli",
	shortName: "Görli",
	chainId: 5,
	network: "goerli",
	testnet: true,
	multicall: "0x77dca2c955b15e9de4dbbcf1246b4b85b651e50e",
	ensResolver: "0x4B1488B7a6B320d2D721406204aBc3eeAa9AD329",
	rpc: [
		"https://eth-goerli.alchemyapi.io/v2/v4nqH_J-J3STit45Mm07TxuYexMHQsYZ"
	],
	explorer: "https://goerli.etherscan.io",
	start: 743550,
	logo: "ipfs://QmR2UYZczmYa4s8mr9HZHci5AQwyAnwUW7tSUZz7KWF3sA"
},
	"7": {
	key: "7",
	name: "ThaiChain",
	chainId: 7,
	network: "mainnet",
	multicall: "0xB9cb900E526e7Ad32A2f26f1fF6Dee63350fcDc5",
	rpc: [
		"https://rpc.dome.cloud"
	],
	ws: [
		"wss://ws.dome.cloud"
	],
	explorer: "https://exp.tch.in.th",
	logo: "ipfs://QmUcNN6ZMFEPLUw5WCknisSgs7nhWC5p992jSSsJVq34Eo"
},
	"8": {
	key: "8",
	name: "Ubiq Mainnet",
	chainId: 8,
	network: "Ubiq mainnet",
	multicall: "0x6668750957e4083725926B71C41bDF1434C73262",
	rpc: [
		"https://rpc.octano.dev"
	],
	ws: [
		"wss://ws.octano.dev"
	],
	explorer: "https://ubiqscan.io",
	logo: "ipfs://Qmec3HLoN4QhwZAhw4XTi2aN8Wwmcko5hHN22sHARzb9tw"
},
	"10": {
	key: "10",
	name: "Optimism Mainnet",
	chainId: 10,
	network: "Optimism mainnet",
	multicall: "0x35A6Cdb2C9AD4a45112df4a04147EB07dFA01aB7",
	rpc: [
		"https://opt-mainnet.g.alchemy.com/v2/JzmIL4Q3jBj7it2duxLFeuCa9Wobmm7D"
	],
	explorer: "https://optimistic.etherscan.io",
	start: 657806,
	logo: "ipfs://QmfF4kwhGL8QosUXvgq2KWCmavhKBvwD6kbhs7L4p5ZAWb"
},
	"20": {
	key: "20",
	name: "Elastos Smart Chain",
	shortName: "ESC",
	chainId: 20,
	network: "mainnet",
	multicall: "0x20205D3b6008bea1411bd4CaEA2D923FE231B6E5",
	rpc: [
		"https://rpc.glidefinance.io",
		"https://escrpc.elaphant.app"
	],
	explorer: "https://esc.elastos.io",
	start: 7826070,
	logo: "ipfs://Qmd2muU2UHo5WsTxE9EpZZJeatimTT9GD4sEnHQe6i9wiA"
},
	"25": {
	key: "25",
	name: "Cronos Mainnet",
	shortName: "Cronos",
	chainId: 25,
	network: "mainnet",
	multicall: "0x6F522a3982e8F9A50A2EDc9E46ed1A3aE2B3FD3a",
	rpc: [
		"https://evm-cronos.crypto.org"
	],
	explorer: "https://cronos.crypto.org/explorer",
	start: 4067,
	logo: "ipfs://QmfSJbtirJoa3Pt7o5Fdm85wbyw9V1hpzqLr5PQbdnfsAj"
},
	"30": {
	key: "30",
	name: "RSK Mainnet",
	chainId: 30,
	network: "rsk mainnet",
	multicall: "0x4eeebb5580769ba6d26bfd07be636300076d1831",
	rpc: [
		"https://public-node.rsk.co"
	],
	explorer: "https://explorer.rsk.co",
	start: 2516442,
	logo: "ipfs://QmXTwpE1SqoNZmyY4c3fYWy6qUgQELsyWKbgJo2Pg6K6V9"
},
	"31": {
	key: "31",
	name: "RSK Testnet",
	chainId: 31,
	network: "rsk testnet",
	testnet: true,
	multicall: "0x4eeebb5580769ba6d26bfd07be636300076d1831",
	rpc: [
		"https://public-node.testnet.rsk.co"
	],
	explorer: "https://explorer.testnet.rsk.co",
	start: 1002369,
	logo: "ipfs://QmbpnJowePd9sDy8hrJv7LsTBkxksuJauw56Y7BqdMdzec"
},
	"42": {
	key: "42",
	name: "Ethereum Testnet Kovan",
	shortName: "Kovan",
	chainId: 42,
	network: "kovan",
	testnet: true,
	multicall: "0x2cc8688c5f75e365aaeeb4ea8d6a480405a48d2a",
	rpc: [
		"https://eth-kovan.alchemyapi.io/v2/sR9qngOH3w78GAaTtlTe8GwEnij0SnEa",
		"https://speedy-nodes-nyc.moralis.io/b9aed21e7bb7bdeb35972c9a/eth/kovan/archive",
		"https://eth-kovan.alchemyapi.io/v2/s96TIUFYg0LuddgpmafA040ZyUaZbrpM",
		"https://poa-kovan.gateway.pokt.network/v1/5f76124fb90218002e9ce985"
	],
	ws: [
		"wss://eth-kovan.ws.alchemyapi.io/v2/QCsM2iU0bQ49eGDmZ7-Y--Wpu0lVWXSO"
	],
	explorer: "https://kovan.etherscan.io",
	start: 11482433,
	logo: "ipfs://QmR2UYZczmYa4s8mr9HZHci5AQwyAnwUW7tSUZz7KWF3sA"
},
	"44": {
	key: "44",
	name: "Crab Network",
	shortName: "Crab",
	chainId: 44,
	network: "mainnet",
	multicall: "0x4617D470F847Ce166019d19a7944049ebB017400",
	rpc: [
		"https://crab-rpc.darwinia.network"
	],
	explorer: "https://crab.subscan.io",
	logo: "ipfs://QmTpySsG7rjLwuZX1Ep4ewGyVAyGrvCRC1oqEvU6oP1huf"
},
	"50": {
	key: "50",
	name: "XDC.Network",
	shortName: "XDC",
	chainId: 50,
	network: "mainnet",
	multicall: "0xc8160deb19559d93eadb82798ededce696ebcaf5",
	rpc: [
		"https://snapshotrpc.blocksscan.io/",
		"https://rpc.xinfin.network"
	],
	ws: [
		"wss://ws.blocksscan.io"
	],
	explorer: "http://xdc.blocksscan.io",
	logo: "ipfs://QmaX3pqjWGg97bR6jjxvTopRkJVxrvwp6VB4jf1Lknq111"
},
	"51": {
	key: "51",
	name: "XDC Apothem.network",
	shortName: "XDC",
	chainId: 51,
	network: "testnet",
	multicall: "0x3b353b02a8b42ee4222ea4be0836629b1f40c8db",
	rpc: [
		"https://apothemrpc.blocksscan.io"
	],
	ws: [
		"wss://apothemws.blocksscan.io"
	],
	explorer: "http://apothem.blocksscan.io",
	logo: "ipfs://QmaX3pqjWGg97bR6jjxvTopRkJVxrvwp6VB4jf1Lknq111"
},
	"56": {
	key: "56",
	name: "Binance Smart Chain Mainnet",
	shortName: "BSC",
	chainId: 56,
	network: "mainnet",
	multicall: "0x1ee38d535d541c55c9dae27b12edf090c608e6fb",
	rpc: [
		"https://speedy-nodes-nyc.moralis.io/b9aed21e7bb7bdeb35972c9a/bsc/mainnet/archive",
		"https://rpc.ankr.com/bsc",
		"https://bsc.getblock.io/mainnet/?api_key=91f8195f-bf46-488f-846a-73d6853790e7",
		"https://bsc-private-dataseed1.nariox.org",
		"https://bsc-dataseed1.ninicoin.io",
		"https://bsc-dataseed1.binance.org"
	],
	explorer: "https://bscscan.com",
	start: 461230,
	logo: "ipfs://QmWQaQ4Tv28DwA4DRKjSDJFWY9mZboGvuu77J8nh7kucxv"
},
	"58": {
	key: "58",
	name: "Ontology Mainnet",
	chainId: 58,
	network: "mainnet",
	multicall: "0xce6292279bf688173B269Df080E14407470A9E60",
	rpc: [
		"https://dappnode1.ont.io:10339",
		"https://dappnode2.ont.io:10339",
		"https://dappnode3.ont.io:10339",
		"https://dappnode4.ont.io:10339"
	],
	explorer: "https://explorer.ont.io/",
	logo: "ipfs://Qme21sVqfwvrjkZHaeKaBH1F8AKPjbAV7vF7rH6akaLkU1"
},
	"61": {
	key: "61",
	name: "Ethereum Classic Mainnet",
	shortName: "Ethereum Classic",
	chainId: 61,
	network: "mainnet",
	multicall: "0x51be3a92C56ae7E207C5b5Fd87F7798Ce82C1AC2",
	rpc: [
		"https://www.ethercluster.com/etc"
	],
	explorer: "https://blockscout.com/etc/mainnet",
	logo: "ipfs://QmVegc28DvA7LjKUFysab81c9BSuN4wQVDQkRXyAtuEBis"
},
	"65": {
	key: "65",
	name: "OKExChain Testnet",
	shortName: "OEC Testnet",
	chainId: 65,
	network: "oec testnet",
	testnet: true,
	multicall: "0x04c68A7fB750ca0Ba232105B3b094926a0f77645",
	rpc: [
		"https://exchaintestrpc.okex.org"
	],
	ws: [
		"wss://exchaintestws.okex.org:8443"
	],
	explorer: "https://www.oklink.com/okexchain-test",
	start: 5320359,
	logo: "ipfs://Qmd7dKnNwHRZ4HRCbCXUbkNV7gP28fGqPdjbHtjRtT9sQF"
},
	"66": {
	key: "66",
	name: "OKExChain Mainnet",
	shortName: "OEC Mainnet",
	chainId: 66,
	network: "oec mainnet",
	multicall: "0x6EB187d8197Ac265c945b69f3c3064A6f3831866",
	rpc: [
		"https://exchainrpc.okex.org"
	],
	ws: [
		"wss://exchainws.okex.org:8443"
	],
	explorer: "https://www.oklink.com/okexchain",
	start: 5076543,
	logo: "ipfs://Qmd7dKnNwHRZ4HRCbCXUbkNV7gP28fGqPdjbHtjRtT9sQF"
},
	"69": {
	key: "69",
	name: "Optimism Kovan",
	chainId: 69,
	network: "Optimism testnet",
	testnet: true,
	multicall: "0x28e9a2329aa6b675ca251a2ccaa7fb029c1e9bfb",
	rpc: [
		"https://opt-kovan.g.alchemy.com/v2/JzmIL4Q3jBj7it2duxLFeuCa9Wobmm7D"
	],
	explorer: "https://kovan-optimistic.etherscan.io",
	start: 882942,
	logo: "ipfs://QmfF4kwhGL8QosUXvgq2KWCmavhKBvwD6kbhs7L4p5ZAWb"
},
	"70": {
	key: "70",
	name: "Hoo Smart Chain Mainnet",
	shortName: "hsc",
	chainId: 70,
	network: "Mainnet",
	multicall: "0xd4b794b89baccb70ef851830099bee4d69f19ebc",
	rpc: [
		"https://http-mainnet2.hoosmartchain.com"
	],
	ws: [
		"wss://ws-mainnet2.hoosmartchain.com"
	],
	explorer: "https://hooscan.com",
	start: 404118,
	logo: "ipfs://QmNhFCVw5GDsu86sGchoRNvQjcr5GL79UJQ3xCHzdFbZYk"
},
	"74": {
	key: "74",
	name: "IDChain",
	shortName: "IDChain",
	chainId: 74,
	network: "mainnet",
	multicall: "0x41d289c966D51342A515A19dE9c27d16079c94E0",
	rpc: [
		"https://idchain.one/archive/rpc/",
		"https://idchain.songadao.org/rpc"
	],
	explorer: "https://explorer.idchain.one",
	start: 10780012,
	logo: "ipfs://QmXAKaNsyv6ctuRenYRJuZ1V4kn1eFwkUtjrjzX6jiKTqe"
},
	"80": {
	key: "80",
	name: "GeneChain",
	chainId: 80,
	network: "Mainnet",
	multicall: "0x9e6ed491171A0D9089892aA5F14800f9f32038eb",
	rpc: [
		"https://rpc.genechain.io"
	],
	explorer: "https://scan.genechain.io",
	logo: "ipfs://QmSV3LTGzE4159zLK4xJVDH5t8iKhY4peh7VAkjefawr2q"
},
	"81": {
	key: "81",
	name: "Shibuya Network",
	shortName: "Shibuya",
	chainId: 81,
	network: "testnet",
	testnet: true,
	multicall: "0x3E90A35839ff0Aa32992d33d861f24dC95BBf74d",
	rpc: [
		"https://rpc.shibuya.astar.network:8545"
	],
	explorer: "https://blockscout.com/shibuya",
	start: 856303,
	logo: "ipfs://QmZLQVsUqHBDXutu6ywTvcYXDZG2xBstMfHkfJSzUNpZsc"
},
	"82": {
	key: "82",
	name: "Meter Mainnet",
	shortName: "Meter",
	chainId: 82,
	network: "mainnet",
	multicall: "0x579De77CAEd0614e3b158cb738fcD5131B9719Ae",
	rpc: [
		"https://rpc.meter.io"
	],
	explorer: "https://scan.meter.io",
	start: 4992871,
	logo: "ipfs://QmSZvT9w9eUDvV1YVaq3BKKEbubtNVqu1Rin44FuN4wz11"
},
	"87": {
	key: "87",
	name: "Nova Network",
	shortName: "Nova",
	chainId: 87,
	network: "mainnet",
	multicall: "0x07f6b55a5dae24ac8011cc2cb815de8316e2b965",
	rpc: [
		"https://dev.rpc.novanetwork.io/"
	],
	explorer: "https://explorer.novanetwork.io/",
	start: 1081731,
	logo: "ipfs://QmTTamJ55YGQwMboq4aqf3JjTEy5WDtjo4GBRQ5VdsWA6U"
},
	"97": {
	key: "97",
	name: "Binance Smart Chain Testnet",
	shortName: "BSC Testnet",
	chainId: 97,
	network: "testnet",
	testnet: true,
	multicall: "0x8b54247c6BAe96A6ccAFa468ebae96c4D7445e46",
	rpc: [
		"https://data-seed-prebsc-1-s1.binance.org:8545",
		"https://speedy-nodes-nyc.moralis.io/f2963e29bec0de5787da3164/bsc/testnet/archive"
	],
	explorer: "https://testnet.bscscan.com",
	start: 3599656,
	logo: "ipfs://QmWQaQ4Tv28DwA4DRKjSDJFWY9mZboGvuu77J8nh7kucxv"
},
	"99": {
	key: "99",
	name: "POA Core",
	shortName: "POA",
	chainId: 99,
	network: "mainnet",
	multicall: "0x2754BB10580dFc6d8Ce6d6CA2939021A06923394",
	rpc: [
		"https://core.poa.network"
	],
	explorer: "https://blockscout.com/poa/core",
	start: 22543252,
	logo: "ipfs://QmZNFCQGA7qT4XJnPSH5NNYrqK6aFsfzZ1NzJwp5D4Tdjr"
},
	"100": {
	key: "100",
	name: "Gnosis Chain",
	shortName: "xDAI",
	chainId: 100,
	network: "mainnet",
	multicall: "0xb5b692a88bdfc81ca69dcb1d924f59f0413a602a",
	rpc: [
		"https://gno.getblock.io/mainnet/6c1d1e6e-75d9-452f-a863-a694bff93d5c/",
		"https://xdai-archive.blockscout.com",
		"https://poa-xdai.gateway.pokt.network/v1/5f76124fb90218002e9ce985",
		"https://rpc.gnosischain.com"
	],
	light: [
		"https://rpc.gnosischain.com"
	],
	ws: [
		"wss://rpc.xdaichain.com/wss"
	],
	explorer: "https://blockscout.com/poa/xdai",
	start: 4108192,
	logo: "ipfs://QmZeiy8Ax4133wzxUQM9ky8z5XFVf6YLFjJMmTWbWVniZR"
},
	"106": {
	key: "106",
	name: "Velas EVM Mainnet",
	shortName: "Velas",
	chainId: 106,
	network: "mainnet",
	multicall: "0x597Cc7c49a8e0041d3A43ec8D7dc651b47879108",
	rpc: [
		"https://evmexplorer.velas.com/rpc",
		"https://explorer.velas.com/rpc"
	],
	ws: [
		"wss://api.velas.com"
	],
	explorer: "https://evmexplorer.velas.com",
	start: 141800,
	logo: "ipfs://QmNXiCXJxEeBd7ZYGYjPSMTSdbDd2nfodLC677gUfk9ku5"
},
	"108": {
	key: "108",
	name: "Thundercore Mainnet",
	chainId: 108,
	network: "mainnet",
	multicall: "",
	rpc: [
		"https://mainnet-rpc.thundercore.com"
	],
	explorer: "https://scan.thundercore.com",
	logo: "ipfs://QmbEsmMPZALcfvNnGDg8F2ABCJM3T2UFBiVBaRsMdkjefG"
},
	"111": {
	key: "111",
	name: "Velas EVM Testnet",
	shortName: "Velas Testnet",
	chainId: 111,
	network: "testnet",
	testnet: true,
	multicall: "0x55a827538FbF41b7334Dd49001220597898Ad954",
	rpc: [
		"https://evmexplorer.testnet.velas.com/rpc",
		"https://explorer.testnet.velas.com/rpc"
	],
	ws: [
		"wss://api.testnet.velas.com"
	],
	explorer: "https://evmexplorer.testnet.velas.com",
	start: 1195129,
	logo: "ipfs://QmQFWn7JJLigUPvvp6uKg6EWikx7QeNxQ2vaCngU3Uthho"
},
	"122": {
	key: "122",
	name: "Fuse Mainnet",
	shortName: "Fuse",
	chainId: 122,
	network: "mainnet",
	multicall: "0x7a59441fb06666F6d2D766393d876945D06a169c",
	rpc: [
		"https://explorer-node.fuse.io/",
		"https://oefusefull1.liquify.info/"
	],
	explorer: "https://explorer.fuse.io",
	start: 11923459,
	logo: "ipfs://QmXjWb64nako7voaVEifgdjAbDbswpTY8bghsiHpv8yWtb"
},
	"128": {
	key: "128",
	name: "Huobi Eco Chain Mainnet",
	shortName: "heco",
	chainId: 128,
	network: "Mainnet",
	multicall: "0x37ab26db3df780e7026f3e767f65efb739f48d8e",
	rpc: [
		"https://pub001.hg.network/rpc"
	],
	ws: [
		"wss://pub001.hg.network/ws"
	],
	explorer: "https://hecoinfo.com",
	start: 403225,
	logo: "ipfs://QmSJEdToMvmjqoPvVq7awwdMeYKhXUYZMBiax9yHtFGMSq"
},
	"137": {
	key: "137",
	name: "Polygon Mainnet",
	shortName: "Polygon",
	chainId: 137,
	network: "mainnet",
	multicall: "0xCBca837161be50EfA5925bB9Cc77406468e76751",
	rpc: [
		"https://rpc.ankr.com/polygon",
		"https://speedy-nodes-nyc.moralis.io/b9aed21e7bb7bdeb35972c9a/polygon/mainnet/archive",
		"https://speedy-nodes-nyc.moralis.io/f2963e29bec0de5787da3164/polygon/mainnet/archive",
		"https://rpc-mainnet.maticvigil.com/v1/1cfd7598e5ba6dcf0b4db58e8be484badc6ea08e"
	],
	ws: [
		"wss://ws-mainnet.matic.network"
	],
	explorer: "https://polygonscan.com",
	start: 9834491,
	logo: "ipfs://QmaGokGqgjknfa4xnXKnnwC5ZyXzUjQ7p6KEe4D8G5uFFE"
},
	"144": {
	key: "144",
	name: "PHI Network",
	shortName: "PHI",
	chainId: 144,
	network: "mainnet",
	multicall: "0xc2f41B404a6757863AAeF49ff93039421acCd630",
	rpc: [
		"https://connect.phi.network"
	],
	explorer: "https://phiscan.com",
	start: 360030,
	logo: "ipfs://bafkreid6pm3mic7izp3a6zlfwhhe7etd276bjfsq2xash6a4s2vmcdf65a"
},
	"188": {
	key: "188",
	name: "Bytom Sidechain",
	shortName: "BMC",
	chainId: 188,
	network: "mainnet",
	multicall: "0xDA09528B093246eC70139b657d3B7A3bd5F4C859",
	rpc: [
		"https://mainnet.bmcchain.com/"
	],
	explorer: "https://bmc.blockmeta.com/",
	start: 4720651,
	logo: "ipfs://bafkreiabhsxuq35pp4kmrbptdeypd6clhcy3ue7ydpppo6onoo4igcjqia"
},
	"246": {
	key: "246",
	name: "Energy Web Chain",
	shortName: "EWC",
	chainId: 246,
	network: "mainnet",
	multicall: "0x0767F26d0D568aB61A98b279C0b28a4164A6f05e",
	rpc: [
		"https://voting-rpc.carbonswap.exchange"
	],
	explorer: "https://explorer.energyweb.org",
	start: 12086501,
	logo: "ipfs://Qmai7AGHgs8NpeGeXgbMZz7pS2i4kw44qubCJYGrZW2f3a"
},
	"250": {
	key: "250",
	name: "Fantom Opera",
	shortName: "fantom",
	chainId: 250,
	network: "Mainnet",
	multicall: "0x7f6A10218264a22B4309F3896745687E712962a0",
	rpc: [
		"https://rpc.ankr.com/fantom",
		"https://rpc.ftm.tools",
		"https://rpcapi.fantom.network"
	],
	explorer: "https://ftmscan.com",
	start: 2497732,
	logo: "ipfs://QmVEgNeQDKnXygeGxfY9FywZpNGQu98ktZtRJ9bToYF6g7"
},
	"256": {
	key: "256",
	name: "Huobi Eco Chain Testnet",
	shortName: "heco",
	chainId: 256,
	network: "testnet",
	testnet: true,
	multicall: "0xC33994Eb943c61a8a59a918E2de65e03e4e385E0",
	rpc: [
		"https://http-testnet.hecochain.com"
	],
	ws: [
		"wss://ws-testnet.hecochain.com"
	],
	explorer: "https://testnet.hecoinfo.com",
	start: 379560,
	logo: "ipfs://QmSJEdToMvmjqoPvVq7awwdMeYKhXUYZMBiax9yHtFGMSq"
},
	"269": {
	key: "269",
	name: "High Performance Blockchain Mainnet",
	shortName: "HPB",
	chainId: 269,
	network: "mainnet",
	testnet: false,
	multicall: "0x67D0f263aef2F6167FA77353695D75b582Ff4Bca",
	rpc: [
		"https://hpbnode.com"
	],
	ws: [
		"wss://ws.hpbnode.com"
	],
	explorer: "https://hscan.org",
	start: 13960096,
	logo: "ipfs://QmU7f1MyRz8rLELFfypnWZQjGbDGYgZtC9rjw47jYMYrnu"
},
	"280": {
	key: "280",
	name: "zkSync 2 testnet",
	shortName: "zkSync2",
	chainId: 280,
	network: "zkSync alpha testnet",
	testnet: true,
	multicall: "0xD2CF10EF0b64B2C9B7147740AEda677d3EfeD2f8",
	rpc: [
		"https://zksync2-testnet.zksync.dev"
	],
	explorer: "https://zksync2-testnet.zkscan.io/",
	start: 1374275,
	logo: "ipfs://QmPDbdmwpEeenaLHAbqcAerXdH9Z4Gfd7gm9M8tbkkjcAS"
},
	"288": {
	key: "288",
	name: "Boba Mainnet",
	shortName: "Boba",
	chainId: 288,
	network: "mainnet",
	multicall: "0xfb91c019D9F12A0f9c23B4762fa64A34F8daDb4A",
	rpc: [
		"https://mainnet.boba.network/"
	],
	explorer: "https://blockexplorer.boba.network",
	start: 74,
	logo: "ipfs://QmNc7QZFpPDue3Ef4SsuX55RHkqXxUxSyTCpoASeg2hW6d"
},
	"321": {
	key: "321",
	name: "KCC Mainnet",
	shortName: "KCC",
	chainId: 321,
	network: "mainnet",
	multicall: "0xa64D6AFb48225BDA3259246cfb418c0b91de6D7a",
	rpc: [
		"https://rpc-mainnet.kcc.network"
	],
	ws: [
		"wss://rpc-ws-mainnet.kcc.network"
	],
	explorer: "https://explorer.kcc.io",
	start: 1487453,
	logo: "ipfs://QmRdzYGhFRG8QLzMJahHrw3vETE2YZ9sywQbEkenSjKEvb"
},
	"336": {
	key: "336",
	name: "Shiden Network",
	shortName: "Shiden",
	chainId: 336,
	network: "mainnet",
	multicall: "0x3E90A35839ff0Aa32992d33d861f24dC95BBf74d",
	rpc: [
		"https://rpc.shiden.astar.network:8545",
		"https://shiden.api.onfinality.io/public"
	],
	explorer: "https://blockscout.com/shiden",
	start: 1170016,
	logo: "ipfs://QmcqGQE4Sk73zXc3e91TUFFefKBVeaNgbxV141XkSNE4xj"
},
	"361": {
	key: "361",
	name: "Theta Mainnet",
	shortName: "Theta",
	chainId: 361,
	network: "mainnet",
	multicall: "0xB48BbAD564Ceb6fB30cCea2Af248ccF6398aEab5",
	rpc: [
		"https://eth-rpc-api.thetatoken.org/rpc"
	],
	explorer: "https://explorer.thetatoken.org",
	start: 12559216,
	logo: "ipfs://QmcMP9s9mUqfT2SCiP75sZgAVVev7H7RQAKiSx9xWEDKwe"
},
	"416": {
	key: "416",
	name: "SX Network",
	shortName: "SX",
	chainId: 416,
	network: "mainnet",
	multicall: "0x834a005DDCF990Ba1a79f259e840e58F2D14F49a",
	rpc: [
		"https://rpc.sx.technology"
	],
	ws: [
		"wss://rpc.sx.technology/ws"
	],
	explorer: "https://explorer.sx.technology",
	start: 2680605,
	logo: "ipfs://QmSXLXqyr2H6Ja5XrmznXbWTEvF2gFaL8RXNXgyLmDHjAF"
},
	"499": {
	key: "499",
	name: "Rupaya",
	shortName: "RUPX",
	chainId: 499,
	network: "mainnet",
	multicall: "0x7955FF653FfDBf13056FeAe227f655CfF5C194D5",
	rpc: [
		"https://rpc.rupx.io"
	],
	ws: [
		"wss://ws.rupx.io"
	],
	explorer: "http://scan.rupx.io",
	start: 2762929,
	logo: "ipfs://QmXLZyAr6UNFQ4tkNwSyeNByFvzwYpwiNgV5vHuoxn74Rg"
},
	"534": {
	key: "534",
	name: "Candle",
	shortName: "CNDL",
	chainId: 534,
	network: "mainnet",
	multicall: "0x4A21871491adC2C429F9903918C306c97dd295A3",
	rpc: [
		"https://rpc.cndlchain.com",
		"https://candle-rpc.com"
	],
	explorer: "http://candleexplorer.com",
	start: 800000,
	logo: "ipfs://Qmbe3ChumXNRfHcLsNBY2APRrGxkFWP68Nb35MaKMRfPye"
},
	"592": {
	key: "592",
	name: "Astar Network",
	shortName: "Astar",
	chainId: 592,
	network: "mainnet",
	multicall: "0x3E90A35839ff0Aa32992d33d861f24dC95BBf74d",
	rpc: [
		"https://astar.api.onfinality.io/public",
		"https://rpc.astar.network:8545"
	],
	explorer: "https://blockscout.com/astar",
	start: 366482,
	logo: "ipfs://QmZLQVsUqHBDXutu6ywTvcYXDZG2xBstMfHkfJSzUNpZsc"
},
	"595": {
	key: "595",
	name: "Acala Mandala Testnet",
	chainId: 595,
	network: "testnet",
	testnet: true,
	multicall: "0x8ce86f733024c1ccae2224f05c11fd50713d6f81",
	rpc: [
		"https://tc7-eth.aca-dev.network"
	],
	explorer: "https://blockscout.mandala.acala.network",
	start: 1335512,
	logo: "ipfs://QmY1ZYBUzb46Mto7G1GitQWfaqq6n8Q4WArxFBzhNdLqvg"
},
	"888": {
	key: "888",
	name: "Wanchain",
	chainId: 888,
	network: "mainnet",
	multicall: "0xba5934ab3056fca1fa458d30fbb3810c3eb5145f",
	rpc: [
		"https://gwan-ssl.wandevs.org:56891"
	],
	ws: [
		"wss://api.wanchain.org:8443/ws/v3/ddd16770c68f30350a21114802d5418eafe039b722de52b488e7eee1ee2cd73f"
	],
	explorer: "https://www.wanscan.org",
	start: 11302663,
	logo: "ipfs://QmewFFN44rkxESFsHG8edaLt1znr62hjvZhGynfXqruzX3"
},
	"940": {
	key: "940",
	name: "PulseChain Testnet",
	shortName: "pulsechain",
	chainId: 940,
	network: "Testnet",
	multicall: "0x5e67901C2Dd1915E9Ef49aF39B62C28DF8C2c529",
	rpc: [
		"https://rpc.testnet.pulsedisco.net"
	],
	ws: [
		"wss://ws.rpc.testnet.pulsedisco.net"
	],
	explorer: "https://scan.v2.testnet.pulsechain.com",
	start: 15123138,
	logo: "ipfs://QmYqkn8pJUaV9KcEPYEvRPwgbfeozLEvcQ9aEwKNRUL3cR"
},
	"941": {
	key: "941",
	name: "PulseChain Testnet V2B",
	shortName: "pulsechain",
	chainId: 941,
	network: "Testnet v2B",
	multicall: "0x959a437F1444DaDaC8aF997E71EAF0479c810267",
	rpc: [
		"https://rpc.testnet.pulsedisco.net"
	],
	ws: [
		"wss://ws.rpc.testnet.pulsedisco.net"
	],
	explorer: "https://scan.v2b.testnet.pulsechain.com",
	start: 14473847,
	logo: "ipfs://QmYqkn8pJUaV9KcEPYEvRPwgbfeozLEvcQ9aEwKNRUL3cR"
},
	"1001": {
	key: "1001",
	name: "Klaytn Baobab Testnet",
	shortName: "Boabab",
	chainId: 1001,
	network: "testnet",
	multicall: "0x40643B8Aeaaca0b87Ea1A1E596e64a0e14B1d244",
	rpc: [
		"https://baobab.fandom.finance/archive"
	],
	ws: [
		"wss://baobab.fandom.finance/archive/ws"
	],
	explorer: "https://baobab.scope.klaytn.com/",
	logo: "ipfs://QmYACyZcidcFtMo4Uf9H6ZKUxTP2TQPjGzNjcUjqYa64dt"
},
	"1002": {
	key: "1002",
	name: "KardiaChain Mainnet",
	shortName: "KAI",
	chainId: 24,
	network: "mainnet",
	multicall: "0xd9c92F2287B7802A37eC9BEce96Aa65fb5f31E1b",
	rpc: [
		"https://kai-internal.kardiachain.io"
	],
	explorer: "https://explorer.kardiachain.io",
	logo: "ipfs://QmVH3uyPQDcrPC1DMUWCb7HayMv1oMAiKehuWwP2C2fdgM"
},
	"1088": {
	key: "1088",
	name: "Metis",
	shortName: "metis",
	chainId: 1088,
	network: "mainnet",
	multicall: "0xc39aBB6c4451089dE48Cffb013c39d3110530e5C",
	rpc: [
		"https://andromeda.metis.io/?owner=1088"
	],
	explorer: "https://andromeda-explorer.metis.io",
	start: 451,
	logo: "ipfs://QmYeskHqrEvWHqeAuqett64LxfH52HUXZi2T9BAMmgKvBF"
},
	"1284": {
	key: "1284",
	name: "Moonbeam",
	shortName: "GLMR",
	chainId: 1284,
	network: "mainnet",
	multicall: "0x83e3b61886770de2F64AAcaD2724ED4f08F7f36B",
	rpc: [
		"https://rpc.api.moonbeam.network"
	],
	explorer: "https://blockscout.moonbeam.network",
	start: 171135,
	logo: "ipfs://QmWKTEK2pj5sBBbHnMHQbWgw6euVdBrk2Ligpi2chrWASk"
},
	"1285": {
	key: "1285",
	name: "Moonriver (Kusama)",
	shortName: "Moonriver",
	chainId: 1285,
	network: "mainnet",
	multicall: "0x537004440ffFE1D4AE9F009031Fc2b0385FCA9F1",
	rpc: [
		"https://rpc.api.moonriver.moonbeam.network"
	],
	explorer: "https://blockscout.moonriver.moonbeam.network",
	start: 413539,
	logo: "ipfs://QmXtgPesL87Ejhq2Y7yxsaPYpf4RcnoTYPJWPcv6iiYhoi"
},
	"1287": {
	key: "1287",
	name: "Moonbase Alpha TestNet",
	shortName: "Moonbase",
	chainId: 1287,
	network: "testnet",
	testnet: true,
	multicall: "0xf09FD6B6FF3f41614b9d6be2166A0D07045A3A97",
	rpc: [
		"https://rpc.testnet.moonbeam.network"
	],
	explorer: "https://moonbase-blockscout.testnet.moonbeam.network",
	start: 859041,
	logo: "ipfs://QmeGbNTU2Jqwg8qLTMGW8n8HSi2VdgCncAaeGzLx6gYnD7"
},
	"1319": {
	key: "1319",
	name: "AITDChain Mainnet",
	shortName: "AITD",
	chainId: 1319,
	network: "mainnet",
	multicall: "0x16e98974D30263252aa273dC8e3d1d48380845FB",
	rpc: [
		"https://node.aitd.io"
	],
	explorer: "http://aitd-explorer-new.aitd.io",
	start: 1893,
	logo: "ipfs://QmXbBMMhjTTGAGjmqMpJm3ufFrtdkfEXCFyXYgz7nnZzsy"
},
	"1818": {
	key: "1818",
	name: "Cubechain mainnet",
	shortName: "cube",
	chainId: 1818,
	network: "mainnet",
	testnet: false,
	multicall: "0x28d2ebdb36369db1c51355cdc0898754d1a1c3c5",
	rpc: [
		"https://http-mainnet-archive.cube.network"
	],
	explorer: "https://www.cubescan.network",
	start: 0,
	logo: "ipfs://QmbENgHTymTUUArX5MZ2XXH69WGenirU3oamkRD448hYdz"
},
	"1819": {
	key: "1819",
	name: "Cubechain testnet",
	shortName: "cube",
	chainId: 1819,
	network: "testnet",
	testnet: true,
	multicall: "0x5db2AB28beD8EBDDe5F7202F5a11fF7E78Ad1FB5",
	rpc: [
		"https://http-testnet-archive.cube.network"
	],
	explorer: "https://testnet.cubescan.network",
	start: 0,
	logo: "ipfs://QmbENgHTymTUUArX5MZ2XXH69WGenirU3oamkRD448hYdz"
},
	"4689": {
	key: "4689",
	name: "IoTeX Mainnet",
	shortName: "IoTeX",
	chainId: 4689,
	network: "mainnet",
	multicall: "0x9c8B105c94282CDB0F3ecF27e3cfA96A35c07be6",
	rpc: [
		"https://babel-api.mainnet.iotex.io"
	],
	explorer: "https://iotexscan.io",
	start: 11533283,
	logo: "ipfs://QmNkr1UPcBYbvLp7d7Pk4eF3YCsHpaNkfusKZNtykL2EQC"
},
	"4690": {
	key: "4690",
	name: "IoTeX Testnet",
	shortName: "IoTeX",
	chainId: 4690,
	network: "testnet",
	testnet: true,
	multicall: "0x30aE8783d26aBE7Fbb9d83549CCb7430AE4A301F",
	rpc: [
		"https://babel-api.testnet.iotex.io"
	],
	explorer: "https://testnet.iotexscan.io",
	start: 8821493,
	logo: "ipfs://QmNkr1UPcBYbvLp7d7Pk4eF3YCsHpaNkfusKZNtykL2EQC"
},
	"5551": {
	key: "5551",
	name: "Nahmii Mainnet",
	shortName: "Nahmii",
	chainId: 5551,
	network: "mainnet",
	multicall: "0x05911151467b9F42eD14f10ddE0c057347Fff714",
	rpc: [
		"https://l2.nahmii.io"
	],
	explorer: "https://explorer.nahmii.io",
	start: 4364,
	logo: "ipfs://QmPXPCBho3kGLt5rhG9JGkKmzdtLvqZmJqGzzijVCuggWY"
},
	"5553": {
	key: "5553",
	name: "Nahmii Testnet",
	shortName: "Nahmii",
	chainId: 5553,
	network: "testnet",
	testnet: true,
	multicall: "0x0e157d2E45af27564edFAaCcD68f2f0458F3D96c",
	rpc: [
		"https://l2.testnet.nahmii.io"
	],
	explorer: "https://explorer.testnet.nahmii.io",
	start: 53370,
	logo: "ipfs://QmPXPCBho3kGLt5rhG9JGkKmzdtLvqZmJqGzzijVCuggWY"
},
	"5851": {
	key: "5851",
	name: "Ontology Testnet",
	chainId: 5851,
	network: "testnet",
	multicall: "0x381445710b5e73d34aF196c53A3D5cDa58EDBf7A",
	rpc: [
		"https://polaris1.ont.io:10339",
		"https://polaris2.ont.io:10339",
		"https://polaris3.ont.io:10339",
		"https://polaris4.ont.io:10339",
		"https://polaris4.ont.io:10339",
		"https://polaris5.ont.io:10339"
	],
	explorer: "https://explorer.ont.io/testnet",
	logo: "ipfs://Qme21sVqfwvrjkZHaeKaBH1F8AKPjbAV7vF7rH6akaLkU1"
},
	"7341": {
	key: "7341",
	name: "Shyft",
	shortName: "Shyft",
	chainId: 7341,
	network: "mainnet",
	testnet: false,
	multicall: "0xceb10e9133D771cA93c8002Be527A465E85381a2",
	rpc: [
		"https://rpc.shyft.network"
	],
	explorer: "https://bx.shyft.network",
	start: 3673983,
	logo: "ipfs://QmUkFZC2ZmoYPTKf7AHdjwRPZoV2h1MCuHaGM4iu8SNFpi"
},
	"8217": {
	key: "8217",
	name: "Klaytn Mainnet Cypress",
	shortName: "Cypress",
	chainId: 8217,
	network: "mainnet",
	multicall: "0x5f5f0d1b9ff8b3dcace308e39b13b203354906e9",
	rpc: [
		"https://cypress.fandom.finance/archive"
	],
	ws: [
		"wss://cypress.fandom.finance/archive/ws"
	],
	explorer: "https://scope.klaytn.com/",
	logo: "ipfs://QmYACyZcidcFtMo4Uf9H6ZKUxTP2TQPjGzNjcUjqYa64dt"
},
	"10000": {
	key: "10000",
	name: "smartBCH",
	shortName: "BCH",
	chainId: 10000,
	network: "mainnet",
	multicall: "0x1b38EBAd553f218e2962Cb1C0539Abb5d6A37774",
	rpc: [
		"https://smartbch.greyh.at/"
	],
	explorer: "https://www.smartscan.cash",
	logo: "ipfs://QmWG1p7om4hZ4Yi4uQvDpxg4si7qVYhtppGbcDGrhVFvMd"
},
	"11437": {
	key: "11437",
	name: "Shyft Testnet",
	shortName: "Shyft_",
	chainId: 11437,
	network: "testnet",
	testnet: true,
	multicall: "0x407159bAA564dA0c3b14D1215d8E2654cEEE73F4",
	rpc: [
		"https://rpc.testnet.shyft.network"
	],
	explorer: "https://bx.testnet.shyft.network",
	start: 2446296,
	logo: "ipfs://QmUkFZC2ZmoYPTKf7AHdjwRPZoV2h1MCuHaGM4iu8SNFpi"
},
	"12321": {
	key: "12321",
	name: "Wennect Testnet",
	shortName: "Wennect",
	testnet: true,
	chainId: 12321,
	network: "testnet",
	multicall: "0x009c55698516Fe3C58105Fe9bBC5A33ECE7A92e4",
	rpc: [
		"https://rpc.testnet.wennect.com"
	],
	explorer: "https://explorer.testnet.wennect.com",
	start: 3606569,
	logo: "ipfs://bafkreieeo3cetehbkrxjrfzcdb2ym5qgs26cgcw6t633twnuzoqyohqo5m"
},
	"12357": {
	key: "12357",
	name: "REI Testnet",
	shortName: "REI",
	chainId: 12357,
	network: "testnet",
	testnet: true,
	multicall: "0x9eE9904815B80C39C1a27294E69a8626EAa7952d",
	rpc: [
		"https://rpc-testnet.rei.network"
	],
	explorer: "https://scan-test.rei.network/",
	start: 79516,
	logo: "ipfs://QmTogMDLmDgJjDjUKDHDuc2KVTVDbXf8bXJLFiVe8PRxgo"
},
	"32659": {
	key: "32659",
	name: "Fusion Mainnet",
	chainId: 32659,
	network: "mainnet",
	multicall: "0xcd11d8666203a4ea1ecd89885dfe1d4e1a088dbb",
	rpc: [
		"https://mainnet-archive.fusionnetwork.io"
	],
	ws: [
		"wss://mainnet-archive.fusionnetwork.io"
	],
	explorer: "https://fsnscan.com",
	logo: "ipfs://QmRb6YCGdpQTQcdNTnBb5DUixGpjDp1wz6zoADJwQ7hyFq"
},
	"42161": {
	key: "42161",
	name: "Arbitrum One",
	chainId: 42161,
	network: "Arbitrum mainnet",
	multicall: "0x7A7443F8c577d537f1d8cD4a629d40a3148Dd7ee",
	rpc: [
		"https://rpc.ankr.com/arbitrum",
		"https://speedy-nodes-nyc.moralis.io/9e03baabdc27be2a35bdec4a/arbitrum/mainnet",
		"https://arb-mainnet.g.alchemy.com/v2/JDvtNGwnHhTltIwfnxQocKwKkCTKA1DL"
	],
	explorer: "https://arbiscan.io",
	start: 256508,
	logo: "ipfs://QmWZ5SMRfvcK8tycsDqojQaSiKedgtVkS7CkZdxPgeCVsZ"
},
	"42220": {
	key: "42220",
	name: "Celo Mainnet",
	shortName: "Celo",
	chainId: 42220,
	network: "mainnet",
	multicall: "0xb8d0d2C1391eeB350d2Cd39EfABBaaEC297368D9",
	rpc: [
		"https://celo.snapshot.org",
		"https://forno.celo.org",
		"https://celo-mainnet--rpc.datahub.figment.io/apikey/e892a66dc36e4d2d98a5d6406d609796/"
	],
	explorer: "https://explorer.celo.org",
	start: 6599803,
	logo: "ipfs://QmS2tVJ7rdJRe1NHXAi2L86yCbUwVVrmB2mHQeNdJxvQti"
},
	"42262": {
	key: "42262",
	name: "Emerald",
	shortName: "Emerald",
	chainId: 42262,
	network: "mainnet",
	multicall: "0xBD46A7DCD1fefA63A7746a5762A71635Ee0843A1",
	rpc: [
		"https://emerald.oasis.dev"
	],
	explorer: "https://explorer.emerald.oasis.dev",
	start: 176517,
	logo: "ipfs://QmQrZjZZyAcQmPXJM2cUh1KaaDeM8Sfcg3HnvZpBj8wTnG"
},
	"43112": {
	key: "43112",
	name: "Dijets",
	chainId: 43112,
	network: "mainnet",
	testnet: false,
	multicall: "0xc1C0A1e862c24565954402386013f0cCFa87DCAa",
	rpc: [
		"https://dijets.uksouth.cloudapp.azure.com:443/ext/bc/C/rpc"
	],
	explorer: "http://20.9.33.115:4000/",
	start: 179,
	logo: "ipfs://QmcXGHQxwSCovgazfwSLkeq3WPvz91BL9eLMMjGnFYbymE"
},
	"43113": {
	key: "43113",
	name: "Avalanche FUJI Testnet",
	chainId: 43113,
	network: "testnet",
	testnet: true,
	multicall: "0x984476ea55e32e785A9D8FF14329f99D74E3d2A2",
	rpc: [
		"https://api.avax-test.network/ext/bc/C/rpc"
	],
	explorer: "https://testnet.snowtrace.io",
	start: 10528153,
	logo: "ipfs://QmeS75uS7XLR8o8uUzhLRVYPX9vMFf4DXgKxQeCzyy7vM2"
},
	"43114": {
	key: "43114",
	name: "Avalanche",
	chainId: 43114,
	network: "mainnet",
	multicall: "0xc1C0A1e862c24565954402386013f0cCFa87DCAa",
	rpc: [
		"https://nd-784-543-849.p2pify.com/aa7b29fc5fed65b34f0ee6b8de33f8c0/ext/bc/C/rpc",
		"https://rpc.ankr.com/avalanche",
		"https://api.avax.network/ext/bc/C/rpc"
	],
	explorer: "https://snowtrace.io",
	start: 536483,
	logo: "ipfs://QmeS75uS7XLR8o8uUzhLRVYPX9vMFf4DXgKxQeCzyy7vM2"
},
	"47805": {
	key: "47805",
	name: "REI Mainnet",
	chainId: 47805,
	network: "mainnet",
	multicall: "0x9eE9904815B80C39C1a27294E69a8626EAa7952d",
	rpc: [
		"https://rpc.rei.network"
	],
	explorer: "https://scan.rei.network/",
	start: 1715902,
	logo: "ipfs://QmTogMDLmDgJjDjUKDHDuc2KVTVDbXf8bXJLFiVe8PRxgo"
},
	"53935": {
	key: "53935",
	name: "DFK Chain",
	chainId: 53935,
	network: "mainnet",
	multicall: "0x5b24224dC16508DAD755756639E420817DD4c99E",
	rpc: [
		"https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc"
	],
	explorer: "https://subnets.avax.network/defi-kingdoms/",
	start: 62,
	logo: "ipfs://QmZNkpVgPbuVbDcsi6arwH1om3456FGnwfDqYQJWUfHDEx"
},
	"60001": {
	key: "60001",
	name: "Thinkium Testnet Chain 1",
	shortName: "ThinkiumTest1",
	chainId: 60001,
	network: "thinkiumtest1",
	multicall: "0xc49bc485d4f943b287edadbce45eb1a1220ffdfe",
	rpc: [
		"https://test1.thinkiumrpc.net"
	],
	explorer: "https://test1.thinkiumscan.net/",
	start: 323327,
	logo: "ipfs://QmRfiNT4tDhyxfpYcjNde4BMPPWEAygYNPdAaS9bra6aFC"
},
	"70001": {
	key: "70001",
	name: "Thinkium Mainnet Chain 1",
	shortName: "Thinkium1",
	chainId: 70001,
	network: "thinkium1",
	multicall: "0xc49bc485d4f943b287edadbce45eb1a1220ffdfe",
	rpc: [
		"https://proxy1.thinkiumrpc.net"
	],
	explorer: "https://chain1.thinkiumscan.net/",
	start: 26677364,
	logo: "ipfs://QmRfiNT4tDhyxfpYcjNde4BMPPWEAygYNPdAaS9bra6aFC"
},
	"70002": {
	key: "70002",
	name: "Thinkium Mainnet Chain 2",
	shortName: "Thinkium2",
	chainId: 70002,
	network: "thinkium2",
	multicall: "0xc49bc485d4f943b287edadbce45eb1a1220ffdfe",
	rpc: [
		"https://proxy2.thinkiumrpc.net"
	],
	explorer: "https://chain2.thinkiumscan.net/",
	start: 22124397,
	logo: "ipfs://QmRfiNT4tDhyxfpYcjNde4BMPPWEAygYNPdAaS9bra6aFC"
},
	"70103": {
	key: "70103",
	name: "Thinkium Mainnet Chain 103",
	shortName: "Thinkium103",
	chainId: 70103,
	network: "thinkium103",
	multicall: "0xc49bc485d4f943b287edadbce45eb1a1220ffdfe",
	rpc: [
		"https://proxy103.thinkiumrpc.net"
	],
	explorer: "https://chain103.thinkiumscan.net/",
	start: 22090160,
	logo: "ipfs://QmRfiNT4tDhyxfpYcjNde4BMPPWEAygYNPdAaS9bra6aFC"
},
	"80001": {
	key: "80001",
	name: "Matic Mumbai",
	chainId: 80001,
	network: "testnet",
	testnet: true,
	multicall: "0x08411ADd0b5AA8ee47563b146743C13b3556c9Cc",
	rpc: [
		"https://speedy-nodes-nyc.moralis.io/9e03baabdc27be2a35bdec4a/polygon/mumbai/archive",
		"https://rpc-mumbai.matic.today"
	],
	ws: [
		"wss://ws-mumbai.matic.today"
	],
	explorer: "https://mumbai.polygonscan.com",
	start: 12011090,
	logo: "ipfs://QmaGokGqgjknfa4xnXKnnwC5ZyXzUjQ7p6KEe4D8G5uFFE"
},
	"333888": {
	key: "333888",
	name: "Polis Sparta",
	shortName: "Sparta",
	chainId: 333888,
	network: "testnet",
	testnet: true,
	multicall: "0xA4c03972023d5f684d35eF1C541752490975383e",
	rpc: [
		"https://sparta-rpc.polis.tech"
	],
	explorer: "https://sparta-explorer.polis.tech",
	logo: "ipfs://QmSiCni2Jn58WN74SyGNY1Aw5mSh9ypEfFULhjKxA7Tbpg"
},
	"333999": {
	key: "333999",
	name: "Polis Olympus",
	shortName: "Olympus",
	chainId: 333999,
	network: "mainnet",
	multicall: "0x34b99C2a4a4620F10ac779c36b8c61F90FD61732",
	rpc: [
		"https://rpc.polis.tech"
	],
	explorer: "https://explorer.polis.tech",
	start: 1971,
	logo: "ipfs://QmSiCni2Jn58WN74SyGNY1Aw5mSh9ypEfFULhjKxA7Tbpg"
},
	"666666": {
	key: "666666",
	name: "Vision - Vpioneer Testnet",
	shortName: "Vpioneer",
	chainId: 666666,
	network: "testnet",
	multicall: "0xb6E748D6632305E1c12D8369CC6B3eF4AA8A3c85",
	rpc: [
		"https://vpioneer.infragrid.v.network/ethereum/compatible"
	],
	explorer: "https://visionscan.org",
	start: 3369285,
	logo: "ipfs://QmXgGmxDAW2Mheum3WX7Q52Zi9hvE17Zp1pVtZbcVdThh4"
},
	"888888": {
	key: "888888",
	name: "Vision - Mainnet",
	shortName: "Vision",
	chainId: 888888,
	network: "mainnet",
	multicall: "0x7a677A43eb6eEe4AB6c13872Abc04e1bA5CF88eD",
	rpc: [
		"https://infragrid4snapshot.v.network/ethereum/compatible"
	],
	explorer: "https://visionscan.org",
	start: 75909,
	logo: "ipfs://QmXgGmxDAW2Mheum3WX7Q52Zi9hvE17Zp1pVtZbcVdThh4"
},
	"1313161554": {
	key: "1313161554",
	name: "Aurora Mainnet",
	shortName: "Aurora",
	chainId: 1313161554,
	network: "mainnet",
	multicall: "0x32b50c286DEFd2932a0247b8bb940b78c063F16c",
	rpc: [
		"https://mainnet.aurora.dev"
	],
	explorer: "https://explorer.mainnet.aurora.dev",
	start: 57190533,
	logo: "ipfs://QmeRhsR1UPRTQCizdhmgr2XxphXebVKU5di97uCV2UMFpa"
},
	"1666600000": {
	key: "1666600000",
	name: "Harmony Mainnet",
	shortName: "HarmonyMainnet",
	chainId: 1666600000,
	network: "mainnet",
	multicall: "0x9c31392D2e0229dC4Aa250F043d46B9E82074BF8",
	rpc: [
		"https://a.api.s0.t.hmny.io"
	],
	ws: [
		"wss://ws.s0.t.hmny.io"
	],
	explorer: "https://explorer.harmony.one",
	start: 10911984,
	logo: "ipfs://QmNnGPr1CNvj12SSGzKARtUHv9FyEfE5nES73U4vBWQSJL"
},
	"1666700000": {
	key: "1666700000",
	name: "Harmony Testnet",
	shortName: "HarmonyTestnet",
	chainId: 1666700000,
	network: "testnet",
	testnet: true,
	multicall: "0x9923589503Fd205feE3d367DDFF2378f0F7dD2d4",
	rpc: [
		"https://api.s0.b.hmny.io"
	],
	ws: [
		"wss://ws.s0.b.hmny.io"
	],
	explorer: "https://explorer.pops.one",
	start: 7521509,
	logo: "ipfs://QmNnGPr1CNvj12SSGzKARtUHv9FyEfE5nES73U4vBWQSJL"
},
	"11297108109": {
	key: "11297108109",
	name: "Palm Mainnet",
	shortName: "Palm",
	chainId: 11297108109,
	network: "mainnet",
	multicall: "0xfFE2FF36c5b8D948f788a34f867784828aa7415D",
	rpc: [
		"https://palm-mainnet.infura.io/v3/3a961d6501e54add9a41aa53f15de99b"
	],
	explorer: "https://explorer.palm.io",
	start: 1172267,
	logo: "ipfs://QmaYQfjLfQpyRWZZZU1BE8X352rXEjNaNeahjvf1aHZrKY"
},
	"11297108099": {
	key: "11297108099",
	name: "Palm Testnet",
	shortName: "Palm",
	testnet: true,
	chainId: 11297108099,
	network: "testnet",
	multicall: "0x020D24E0b91Fa18Aade990dCEc7F21dcc8e5d174",
	rpc: [
		"https://palm-testnet.infura.io/v3/e504875614714d3aac7061d4a197b190"
	],
	explorer: "https://explorer.palm-uat.xyz/",
	start: 7282345,
	logo: "ipfs://QmRHB9TqMdVHY392vYiv8sTJ7VHShkq5FT6nS9fPuUNBf1"
}
};

var delegationSubgraphs = {
	"1": "https://gateway.thegraph.com/api/0f15b42bdeff7a063a4e1757d7e2f99e/deployments/id/QmXvEzRJXby7KFuTr7NJsM47hGefM5VckEXZrQyZzL9eJd",
	"4": "https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-rinkeby",
	"5": "https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-goerli",
	"10": "https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-optimism",
	"42": "https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-kovan",
	"56": "https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-binance-smart-chain",
	"100": "https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-gnosis-chain",
	"137": "https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-polygon",
	"250": "https://api.thegraph.com/subgraphs/name/snapshot-labs/snapshot-fantom"
};

var SingleChoiceVoting = /** @class */ (function () {
    function SingleChoiceVoting(proposal, votes, strategies, selected) {
        this.proposal = proposal;
        this.votes = votes;
        this.strategies = strategies;
        this.selected = selected;
    }
    SingleChoiceVoting.isValidChoice = function (voteChoice, proposalChoices) {
        return (typeof voteChoice === 'number' &&
            (proposalChoices === null || proposalChoices === void 0 ? void 0 : proposalChoices[voteChoice - 1]) !== undefined);
    };
    SingleChoiceVoting.prototype.getValidVotes = function () {
        var _this = this;
        return this.votes.filter(function (vote) {
            return SingleChoiceVoting.isValidChoice(vote.choice, _this.proposal.choices);
        });
    };
    SingleChoiceVoting.prototype.getScores = function () {
        var _this = this;
        return this.proposal.choices.map(function (choice, i) {
            var votes = _this.getValidVotes().filter(function (vote) { return vote.choice === i + 1; });
            var balanceSum = votes.reduce(function (a, b) { return a + b.balance; }, 0);
            return balanceSum;
        });
    };
    SingleChoiceVoting.prototype.getScoresByStrategy = function () {
        var _this = this;
        return this.proposal.choices.map(function (choice, i) {
            var scores = _this.strategies.map(function (strategy, sI) {
                var votes = _this.getValidVotes().filter(function (vote) { return vote.choice === i + 1; });
                var scoreSum = votes.reduce(function (a, b) { return a + b.scores[sI]; }, 0);
                return scoreSum;
            });
            return scores;
        });
    };
    SingleChoiceVoting.prototype.getScoresTotal = function () {
        return this.getValidVotes().reduce(function (a, b) { return a + b.balance; }, 0);
    };
    SingleChoiceVoting.prototype.getChoiceString = function () {
        return this.proposal.choices[this.selected - 1];
    };
    return SingleChoiceVoting;
}());

var ApprovalVoting = /** @class */ (function () {
    function ApprovalVoting(proposal, votes, strategies, selected) {
        this.proposal = proposal;
        this.votes = votes;
        this.strategies = strategies;
        this.selected = selected;
    }
    ApprovalVoting.isValidChoice = function (voteChoice, proposalChoices) {
        return (Array.isArray(voteChoice) &&
            // If voteChoice index is not in proposalChoices, return false
            voteChoice.every(function (choice) { return (proposalChoices === null || proposalChoices === void 0 ? void 0 : proposalChoices[choice - 1]) !== undefined; }) &&
            // If any voteChoice is duplicated, return false
            voteChoice.length === new Set(voteChoice).size &&
            // If voteChoice is empty, return false
            voteChoice.length > 0);
    };
    ApprovalVoting.prototype.getValidVotes = function () {
        var _this = this;
        return this.votes.filter(function (vote) {
            return ApprovalVoting.isValidChoice(vote.choice, _this.proposal.choices);
        });
    };
    ApprovalVoting.prototype.getScores = function () {
        var _this = this;
        return this.proposal.choices.map(function (choice, i) {
            return _this.getValidVotes()
                .filter(function (vote) { return vote.choice.includes(i + 1); })
                .reduce(function (a, b) { return a + b.balance; }, 0);
        });
    };
    ApprovalVoting.prototype.getScoresByStrategy = function () {
        var _this = this;
        return this.proposal.choices.map(function (choice, i) {
            return _this.strategies.map(function (strategy, sI) {
                return _this.getValidVotes()
                    .filter(function (vote) { return vote.choice.includes(i + 1); })
                    .reduce(function (a, b) { return a + b.scores[sI]; }, 0);
            });
        });
    };
    ApprovalVoting.prototype.getScoresTotal = function () {
        return this.getValidVotes().reduce(function (a, b) { return a + b.balance; }, 0);
    };
    ApprovalVoting.prototype.getChoiceString = function () {
        var _this = this;
        if (!this.selected)
            return '';
        return this.proposal.choices
            .filter(function (choice, i) { return _this.selected.includes(i + 1); })
            .join(', ');
    };
    return ApprovalVoting;
}());

function percentageOfTotal(i, values, total) {
    var reducedTotal = total.reduce(function (a, b) { return a + b; }, 0);
    var percent = (values[i] / reducedTotal) * 100;
    return isNaN(percent) ? 0 : percent;
}
function quadraticMath(i, choice, balance) {
    return Math.sqrt((percentageOfTotal(i + 1, choice, Object.values(choice)) / 100) * balance);
}
var QuadraticVoting = /** @class */ (function () {
    function QuadraticVoting(proposal, votes, strategies, selected) {
        this.proposal = proposal;
        this.votes = votes;
        this.strategies = strategies;
        this.selected = selected;
    }
    QuadraticVoting.isValidChoice = function (voteChoice, proposalChoices) {
        return (typeof voteChoice === 'object' &&
            !Array.isArray(voteChoice) &&
            voteChoice !== null &&
            // If voteChoice object keys are not in choices, return false
            Object.keys(voteChoice).every(function (key) { return (proposalChoices === null || proposalChoices === void 0 ? void 0 : proposalChoices[Number(key) - 1]) !== undefined; }) &&
            // If voteChoice object is empty, return false
            Object.keys(voteChoice).length > 0 &&
            // If voteChoice object values have a negative number, return false
            Object.values(voteChoice).every(function (value) { return typeof value === 'number' && value >= 0; }) &&
            // If voteChoice doesn't have any positive value, return false
            Object.values(voteChoice).some(function (value) { return typeof value === 'number' && value > 0; }));
    };
    QuadraticVoting.prototype.getValidVotes = function () {
        var _this = this;
        return this.votes.filter(function (vote) {
            return QuadraticVoting.isValidChoice(vote.choice, _this.proposal.choices);
        });
    };
    QuadraticVoting.prototype.getScores = function () {
        var _this = this;
        var results = this.proposal.choices
            .map(function (choice, i) {
            return _this.getValidVotes()
                .map(function (vote) { return quadraticMath(i, vote.choice, vote.balance); })
                .reduce(function (a, b) { return a + b; }, 0);
        })
            .map(function (sqrt) { return sqrt * sqrt; });
        return results
            .map(function (res, i) { return percentageOfTotal(i, results, results); })
            .map(function (p) { return (_this.getScoresTotal() / 100) * p; });
    };
    QuadraticVoting.prototype.getScoresByStrategy = function () {
        var _this = this;
        var results = this.proposal.choices
            .map(function (choice, i) {
            return _this.strategies.map(function (strategy, sI) {
                return _this.getValidVotes()
                    .map(function (vote) { return quadraticMath(i, vote.choice, vote.scores[sI]); })
                    .reduce(function (a, b) { return a + b; }, 0);
            });
        })
            .map(function (arr) { return arr.map(function (sqrt) { return [sqrt * sqrt]; }); });
        return results.map(function (res, i) {
            return _this.strategies
                .map(function (strategy, sI) {
                return percentageOfTotal(0, results[i][sI], results.flat(2));
            })
                .map(function (p) { return [(_this.getScoresTotal() / 100) * p]; })
                .flat();
        });
    };
    QuadraticVoting.prototype.getScoresTotal = function () {
        return this.getValidVotes().reduce(function (a, b) { return a + b.balance; }, 0);
    };
    QuadraticVoting.prototype.getChoiceString = function () {
        var _this = this;
        return this.proposal.choices
            .map(function (choice, i) {
            if (_this.selected[i + 1]) {
                return Math.round(percentageOfTotal(i + 1, _this.selected, Object.values(_this.selected)) * 10) / 10 + "% for " + choice;
            }
        })
            .filter(function (el) { return el != null; })
            .join(', ');
    };
    return QuadraticVoting;
}());

function irv(ballots, rounds) {
    var candidates = __spread(new Set(ballots.map(function (vote) { return vote[0]; }).flat()));
    var votes = Object.entries(ballots.reduce(function (votes, _a, i, src) {
        var _b = __read(_a, 1), v = _b[0];
        var balance = src[i][1];
        votes[v[0]][0] += balance;
        var score = src[i][2];
        if (score.length > 1) {
            votes[v[0]][1] = score.map(function (s, sI) { return s + votes[v[0]][1][sI] || s; });
        }
        else
            votes[v[0]][1] = [
                votes[v[0]][1].concat(score).reduce(function (a, b) { return a + b; }, 0)
            ];
        return votes;
    }, Object.assign.apply(Object, __spread([{}], candidates.map(function (c) {
        var _a;
        return (_a = {}, _a[c] = [0, []], _a);
    })))));
    var votesWithoutScore = votes.map(function (vote) { return [vote[0], vote[1][0]]; });
    /* eslint-disable @typescript-eslint/no-unused-vars */
    var _a = __read(votesWithoutScore.reduce(function (_a, _b) {
        var _c = __read(_a, 2), n = _c[0], m = _c[1];
        var _d = __read(_b, 2), v = _d[0], c = _d[1];
        return (c > m ? [v, c] : [n, m]);
    }, ['?', -Infinity]), 2), topCand = _a[0], topCount = _a[1];
    var _b = __read(votesWithoutScore.reduce(function (_a, _b) {
        var _c = __read(_a, 2), n = _c[0], m = _c[1];
        var _d = __read(_b, 2), v = _d[0], c = _d[1];
        return (c < m ? [v, c] : [n, m]);
    }, ['?', Infinity]), 2), bottomCand = _b[0], bottomCount = _b[1];
    /* eslint-enable @typescript-eslint/no-unused-vars */
    var sortedByHighest = votes.sort(function (a, b) { return b[1][0] - a[1][0]; });
    var totalPowerOfVotes = ballots
        .map(function (bal) { return bal[1]; })
        .reduce(function (a, b) { return a + b; }, 0);
    rounds.push({
        round: rounds.length + 1,
        sortedByHighest: sortedByHighest
    });
    return topCount > totalPowerOfVotes / 2 ||
        sortedByHighest.length < 3
        ? rounds
        : irv(ballots
            .map(function (ballot) { return [
            ballot[0].filter(function (c) { return c != bottomCand; }),
            ballot[1],
            ballot[2]
        ]; })
            .filter(function (ballot) { return ballot[0].length > 0; }), rounds);
}
function getFinalRound(votes) {
    var rounds = irv(votes.map(function (vote) { return [vote.choice, vote.balance, vote.scores]; }), []);
    var finalRound = rounds[rounds.length - 1];
    return finalRound.sortedByHighest;
}
var RankedChoiceVoting = /** @class */ (function () {
    function RankedChoiceVoting(proposal, votes, strategies, selected) {
        this.proposal = proposal;
        this.votes = votes;
        this.strategies = strategies;
        this.selected = selected;
    }
    RankedChoiceVoting.isValidChoice = function (voteChoice, proposalChoices) {
        return (Array.isArray(voteChoice) &&
            // If voteChoice index is not in choices, return false
            voteChoice.every(function (voteChoice) { return (proposalChoices === null || proposalChoices === void 0 ? void 0 : proposalChoices[voteChoice - 1]) !== undefined; }) &&
            // If any voteChoice is duplicated, return false
            voteChoice.length === new Set(voteChoice).size &&
            // If voteChoice is empty, return false
            voteChoice.length > 0 &&
            // If not all proposalChoices are selected, return false
            // TODO: We should add support for pacial bailout in the future
            voteChoice.length === proposalChoices.length);
    };
    RankedChoiceVoting.prototype.getValidVotes = function () {
        var _this = this;
        return this.votes.filter(function (vote) {
            return RankedChoiceVoting.isValidChoice(vote.choice, _this.proposal.choices);
        });
    };
    RankedChoiceVoting.prototype.getScores = function () {
        var finalRound = getFinalRound(this.getValidVotes());
        return this.proposal.choices.map(function (choice, i) {
            return finalRound
                .filter(function (res) { return Number(res[0]) === i + 1; })
                .reduce(function (a, b) { return a + b[1][0]; }, 0);
        });
    };
    RankedChoiceVoting.prototype.getScoresByStrategy = function () {
        var _this = this;
        var finalRound = getFinalRound(this.getValidVotes());
        return this.proposal.choices.map(function (choice, i) {
            return _this.strategies.map(function (strategy, sI) {
                return finalRound
                    .filter(function (res) { return Number(res[0]) === i + 1; })
                    .reduce(function (a, b) { return a + b[1][1][sI]; }, 0);
            });
        });
    };
    RankedChoiceVoting.prototype.getScoresTotal = function () {
        return this.getScores().reduce(function (a, b) { return a + b; });
    };
    RankedChoiceVoting.prototype.getChoiceString = function () {
        var _this = this;
        return this.selected
            .map(function (choice) {
            if (_this.proposal.choices[choice - 1])
                return _this.proposal.choices[choice - 1];
        })
            .map(function (el, i) { return "(" + getNumberWithOrdinal(i + 1) + ") " + el; })
            .join(', ');
    };
    return RankedChoiceVoting;
}());

function percentageOfTotal$1(i, values, total) {
    var reducedTotal = total.reduce(function (a, b) { return a + b; }, 0);
    var percent = (values[i] / reducedTotal) * 100;
    return isNaN(percent) ? 0 : percent;
}
function weightedPower(i, choice, balance) {
    return ((percentageOfTotal$1(i + 1, choice, Object.values(choice)) / 100) * balance);
}
var WeightedVoting = /** @class */ (function () {
    function WeightedVoting(proposal, votes, strategies, selected) {
        this.proposal = proposal;
        this.votes = votes;
        this.strategies = strategies;
        this.selected = selected;
    }
    WeightedVoting.isValidChoice = function (voteChoice, proposalChoices) {
        return (typeof voteChoice === 'object' &&
            !Array.isArray(voteChoice) &&
            voteChoice !== null &&
            // If voteChoice object keys are not in choices, return false
            Object.keys(voteChoice).every(function (key) { return (proposalChoices === null || proposalChoices === void 0 ? void 0 : proposalChoices[Number(key) - 1]) !== undefined; }) &&
            // If voteChoice object is empty, return false
            Object.keys(voteChoice).length > 0 &&
            // If voteChoice object values have a negative number, return false
            Object.values(voteChoice).every(function (value) { return typeof value === 'number' && value >= 0; }) &&
            // If voteChoice doesn't have any positive value, return false
            Object.values(voteChoice).some(function (value) { return typeof value === 'number' && value > 0; }));
    };
    WeightedVoting.prototype.getValidVotes = function () {
        var _this = this;
        return this.votes.filter(function (vote) {
            return WeightedVoting.isValidChoice(vote.choice, _this.proposal.choices);
        });
    };
    WeightedVoting.prototype.getScores = function () {
        var _this = this;
        var results = this.proposal.choices.map(function (choice, i) {
            return _this.getValidVotes()
                .map(function (vote) { return weightedPower(i, vote.choice, vote.balance); })
                .reduce(function (a, b) { return a + b; }, 0);
        });
        return results
            .map(function (res, i) { return percentageOfTotal$1(i, results, results); })
            .map(function (p) { return (_this.getScoresTotal() / 100) * p; });
    };
    WeightedVoting.prototype.getScoresByStrategy = function () {
        var _this = this;
        var results = this.proposal.choices
            .map(function (choice, i) {
            return _this.strategies.map(function (strategy, sI) {
                return _this.getValidVotes()
                    .map(function (vote) { return weightedPower(i, vote.choice, vote.scores[sI]); })
                    .reduce(function (a, b) { return a + b; }, 0);
            });
        })
            .map(function (arr) { return arr.map(function (pwr) { return [pwr]; }); });
        return results.map(function (res, i) {
            return _this.strategies
                .map(function (strategy, sI) {
                return percentageOfTotal$1(0, results[i][sI], results.flat(2));
            })
                .map(function (p) { return [(_this.getScoresTotal() / 100) * p]; })
                .flat();
        });
    };
    WeightedVoting.prototype.getScoresTotal = function () {
        return this.getValidVotes().reduce(function (a, b) { return a + b.balance; }, 0);
    };
    WeightedVoting.prototype.getChoiceString = function () {
        var _this = this;
        return this.proposal.choices
            .map(function (choice, i) {
            if (_this.selected[i + 1]) {
                return Math.round(percentageOfTotal$1(i + 1, _this.selected, Object.values(_this.selected)) * 10) / 10 + "% for " + choice;
            }
        })
            .filter(function (el) { return el != null; })
            .join(', ');
    };
    return WeightedVoting;
}());

var voting = {
    'single-choice': SingleChoiceVoting,
    approval: ApprovalVoting,
    quadratic: QuadraticVoting,
    'ranked-choice': RankedChoiceVoting,
    weighted: WeightedVoting,
    basic: SingleChoiceVoting
};

var SNAPSHOT_SUBGRAPH_URL = delegationSubgraphs;
var ENS_RESOLVER_ABI = [
    'function text(bytes32 node, string calldata key) external view returns (string memory)'
];
function call(provider, abi, call, options) {
    return __awaiter(this, void 0, void 0, function () {
        var contract, params, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contract = new Contract(call[0], abi, provider);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    params = call[2] || [];
                    return [4 /*yield*/, contract[call[1]].apply(contract, __spread(params, [options || {}]))];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    e_1 = _a.sent();
                    return [2 /*return*/, Promise.reject(e_1)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function multicall(network, provider, abi, calls, options) {
    return __awaiter(this, void 0, void 0, function () {
        var multicallAbi, multi, itf, max_1, pages, promises_1, results, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    multicallAbi = [
                        'function aggregate(tuple(address target, bytes callData)[] calls) view returns (uint256 blockNumber, bytes[] returnData)'
                    ];
                    multi = new Contract(networks[network].multicall, multicallAbi, provider);
                    itf = new Interface(abi);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    max_1 = (options === null || options === void 0 ? void 0 : options.limit) || 500;
                    pages = Math.ceil(calls.length / max_1);
                    promises_1 = [];
                    Array.from(Array(pages)).forEach(function (x, i) {
                        var callsInPage = calls.slice(max_1 * i, max_1 * (i + 1));
                        promises_1.push(multi.aggregate(callsInPage.map(function (call) { return [
                            call[0].toLowerCase(),
                            itf.encodeFunctionData(call[1], call[2])
                        ]; }), options || {}));
                    });
                    return [4 /*yield*/, Promise.all(promises_1)];
                case 2:
                    results = _a.sent();
                    results = results.reduce(function (prev, _a) {
                        var _b = __read(_a, 2), res = _b[1];
                        return prev.concat(res);
                    }, []);
                    return [2 /*return*/, results.map(function (call, i) {
                            return itf.decodeFunctionResult(calls[i][1], call);
                        })];
                case 3:
                    e_2 = _a.sent();
                    return [2 /*return*/, Promise.reject(e_2)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function subgraphRequest(url, query, options) {
    if (options === void 0) { options = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var res, responseData, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(url, {
                        method: 'POST',
                        headers: __assign({ Accept: 'application/json', 'Content-Type': 'application/json' }, options === null || options === void 0 ? void 0 : options.headers),
                        body: JSON.stringify({ query: jsonToGraphQLQuery({ query: query }) })
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    responseData = _a.sent();
                    if (responseData.errors) {
                        throw new Error('Errors found in subgraphRequest: ' +
                            url +
                            JSON.stringify(responseData.errors));
                    }
                    data = responseData.data;
                    return [2 /*return*/, data || {}];
            }
        });
    });
}
function getUrl(uri, gateway) {
    if (gateway === void 0) { gateway = gateways[0]; }
    var ipfsGateway = "https://" + gateway;
    if (!uri)
        return null;
    if (!uri.startsWith('ipfs://') &&
        !uri.startsWith('ipns://') &&
        !uri.startsWith('https://') &&
        !uri.startsWith('http://'))
        return ipfsGateway + "/ipfs/" + uri;
    var uriScheme = uri.split('://')[0];
    if (uriScheme === 'ipfs')
        return uri.replace('ipfs://', ipfsGateway + "/ipfs/");
    if (uriScheme === 'ipns')
        return uri.replace('ipns://', ipfsGateway + "/ipns/");
    return uri;
}
function getJSON(uri) {
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            url = getUrl(uri);
            return [2 /*return*/, fetch(url).then(function (res) { return res.json(); })];
        });
    });
}
function ipfsGet(gateway, ipfsHash, protocolType) {
    if (protocolType === void 0) { protocolType = 'ipfs'; }
    return __awaiter(this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            url = "https://" + gateway + "/" + protocolType + "/" + ipfsHash;
            return [2 /*return*/, fetch(url).then(function (res) { return res.json(); })];
        });
    });
}
function sendTransaction(web3, contractAddress, abi, action, params, overrides) {
    if (overrides === void 0) { overrides = {}; }
    return __awaiter(this, void 0, void 0, function () {
        var signer, contract, contractWithSigner;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signer = web3.getSigner();
                    contract = new Contract(contractAddress, abi, web3);
                    contractWithSigner = contract.connect(signer);
                    return [4 /*yield*/, contractWithSigner[action].apply(contractWithSigner, __spread(params, [overrides]))];
                case 1: 
                // overrides.gasLimit = 12e6;
                return [2 /*return*/, _a.sent()];
            }
        });
    });
}
function getScores(space, strategies, network, addresses, snapshot, scoreApiUrl) {
    if (snapshot === void 0) { snapshot = 'latest'; }
    if (scoreApiUrl === void 0) { scoreApiUrl = 'https://score.snapshot.org/api/scores'; }
    return __awaiter(this, void 0, void 0, function () {
        var params, res, obj, e_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    params = {
                        space: space,
                        network: network,
                        snapshot: snapshot,
                        strategies: strategies,
                        addresses: addresses
                    };
                    return [4 /*yield*/, fetch(scoreApiUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ params: params })
                        })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    obj = _a.sent();
                    return [2 /*return*/, obj.result.scores];
                case 3:
                    e_3 = _a.sent();
                    return [2 /*return*/, Promise.reject(e_3)];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getVp(address, network, strategies, snapshot, space, delegation, options) {
    return __awaiter(this, void 0, void 0, function () {
        var init, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!options)
                        options = {};
                    if (!options.url)
                        options.url = 'https://score.snapshot.org';
                    init = {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            jsonrpc: '2.0',
                            method: 'get_vp',
                            params: {
                                address: address,
                                network: network,
                                strategies: strategies,
                                snapshot: snapshot,
                                space: space,
                                delegation: delegation
                            },
                            id: null
                        })
                    };
                    return [4 /*yield*/, fetch(options.url, init)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2: return [2 /*return*/, (_a.sent()).result];
            }
        });
    });
}
function validateSchema(schema, data) {
    var ajv = new Ajv({ allErrors: true, allowUnionTypes: true, $data: true });
    // @ts-ignore
    addFormats(ajv);
    // Custom URL format to allow empty string values
    // https://github.com/snapshot-labs/snapshot.js/pull/541/files
    ajv.addFormat('customUrl', {
        type: 'string',
        validate: function (str) {
            if (!str.length)
                return true;
            return (str.startsWith('http://') ||
                str.startsWith('https://') ||
                str.startsWith('ipfs://') ||
                str.startsWith('ipns://') ||
                str.startsWith('snapshot://'));
        }
    });
    var validate = ajv.compile(schema);
    var valid = validate(data);
    return valid ? valid : validate.errors;
}
function getEnsTextRecord(ens, record, network) {
    if (network === void 0) { network = '1'; }
    var address = networks[network].ensResolver || networks['1'].ensResolver;
    var ensHash = hash(normalize(ens));
    var provider = getProvider(network);
    return call(provider, ENS_RESOLVER_ABI, [address, 'text', [ensHash, record]]);
}
function getSpaceUri(id, network) {
    if (network === void 0) { network = '1'; }
    return __awaiter(this, void 0, void 0, function () {
        var e_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getEnsTextRecord(id, 'snapshot', network)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    e_4 = _a.sent();
                    console.log('getSpaceUriFromTextRecord failed', id, e_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/, false];
            }
        });
    });
}
function getDelegatesBySpace(network, space, snapshot) {
    if (snapshot === void 0) { snapshot = 'latest'; }
    return __awaiter(this, void 0, void 0, function () {
        var spaceIn, PAGE_SIZE, result, page, params, pageResult, pageDelegations;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!delegationSubgraphs[network]) {
                        return [2 /*return*/, Promise.reject("Delegation subgraph not available for network " + network)];
                    }
                    spaceIn = ['', space];
                    if (space.includes('.eth'))
                        spaceIn.push(space.replace('.eth', ''));
                    PAGE_SIZE = 1000;
                    result = [];
                    page = 0;
                    params = {
                        delegations: {
                            __args: {
                                where: {
                                    space_in: spaceIn
                                },
                                first: PAGE_SIZE,
                                skip: 0
                            },
                            delegator: true,
                            space: true,
                            delegate: true
                        }
                    };
                    if (snapshot !== 'latest') {
                        params.delegations.__args.block = { number: snapshot };
                    }
                    _a.label = 1;
                case 1:
                    params.delegations.__args.skip = page * PAGE_SIZE;
                    return [4 /*yield*/, subgraphRequest(delegationSubgraphs[network], params)];
                case 2:
                    pageResult = _a.sent();
                    pageDelegations = pageResult.delegations || [];
                    result = result.concat(pageDelegations);
                    page++;
                    if (pageDelegations.length < PAGE_SIZE)
                        return [3 /*break*/, 3];
                    return [3 /*break*/, 1];
                case 3: return [2 /*return*/, result];
            }
        });
    });
}
function clone(item) {
    return JSON.parse(JSON.stringify(item));
}
function sleep(time) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) {
                    setTimeout(resolve, time);
                })];
        });
    });
}
function getNumberWithOrdinal(n) {
    var s = ['th', 'st', 'nd', 'rd'], v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
var utils = {
    call: call,
    multicall: multicall,
    subgraphRequest: subgraphRequest,
    ipfsGet: ipfsGet,
    getUrl: getUrl,
    getJSON: getJSON,
    sendTransaction: sendTransaction,
    getScores: getScores,
    getVp: getVp,
    validateSchema: validateSchema,
    getEnsTextRecord: getEnsTextRecord,
    getSpaceUri: getSpaceUri,
    getDelegatesBySpace: getDelegatesBySpace,
    clone: clone,
    sleep: sleep,
    getNumberWithOrdinal: getNumberWithOrdinal,
    voting: voting,
    getProvider: getProvider,
    signMessage: signMessage,
    getBlockNumber: getBlockNumber,
    Multicaller: Multicaller,
    getSnapshots: getSnapshots,
    validations: validations,
    getHash: getHash,
    verify: verify$1,
    SNAPSHOT_SUBGRAPH_URL: SNAPSHOT_SUBGRAPH_URL
};

var index = {
    Client: Client$1,
    Client712: Client,
    schemas: schemas,
    utils: utils
};

export default index;
