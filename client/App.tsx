import { CrossTabClient, log } from '@logux/client'
import { ClientContext, ChannelErrors } from '@logux/client/react'

import { SUBPROTOCOL } from '../protocol/protocol'
import { Users } from './users/Users'

const UID = '10'
const CLIENT = new CrossTabClient({
	server: 'ws://localhost:31337',
	subprotocol: SUBPROTOCOL,
	userId: UID
})

CLIENT.start()
log(CLIENT)

const errorCls = 'flex h-screen w-screen justify-center items-center font-semibold text-4xl'

const Page403 = () => <div className={errorCls}>Error 403</div>
const Page404 = () => <div className={errorCls}>Error 404</div>
const Page500 = () => <div className={errorCls}>Error 500</div>

function App() {
	return (
		<ClientContext.Provider value={CLIENT}>
			<ChannelErrors AccessDenied={Page403} NotFound={Page404} Error={Page500}>
					<Users userId={UID} />
			</ChannelErrors>
		</ClientContext.Provider>
	)
}

export default App
