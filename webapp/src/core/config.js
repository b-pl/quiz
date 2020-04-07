let host = ''

if (window.location.hostname === 'localhost') host = '/api'
else host = 'http://api.quiz.b-pl.usermd.net/api'

export default host