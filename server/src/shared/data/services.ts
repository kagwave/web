const microservices = {
  auth: {
    port: 8200,
    basePath: '/auth'
  },
  application: {
    port: 8205,
    basePath: '/'
  },
  externalProviders: {
    port: 8008,
    basePath: '/'
  },
  gameServer1: {
    port: 8501,
    basePath: '/server'
  },
  gameServer2: {
    port: 8502,
    basePath: '/server'
  },
  gameServer3: {
    port: 8503,
    basePath: '/server'
  },
  gameServer4: {
    port: 8504,
    basePath: '/server'
  },
  gameServer5: {
    port: 8505,
    basePath: '/server'
  },
  ai: {
    port: 8240,
    basePath: '/ai'
  },
  api: {
    port: 8080,
    basePath: '/api'
  },
  payments: {
    port: 8001,
    basePath: '/payments'
  },
  google: {
    port: 8100,
    basePath: '/google'
  }
};

export default microservices;