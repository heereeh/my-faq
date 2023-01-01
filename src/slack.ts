// import { WebClient } from "@slack/web-api"
import axios from "axios"
import { User } from "types"

const token = process.env.REACT_APP_SLACK_TOKEN
const channelId = process.env.REACT_APP_CHANNEL_ID as string
const messageWebhook = process.env.REACT_APP_SLACK_MESSAGE_WEBHOOK
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`
}

export const postMessage = async(user: User, message: string) => {
  try {
    const text = `[${user.uid}, ${user.displayName}}]\n${message}`
    const { data } = await axios({
      method: "post",
      url: `/slack${messageWebhook}`,
      headers,
      data: {
        blocks: [
          {
            type: "section",
            text: {
              type: 'mrkdwn',
              text
            }
          }
        ]
      }
    })
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}