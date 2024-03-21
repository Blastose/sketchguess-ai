from dotenv import load_dotenv
import os

load_dotenv()


def main():
    print(
        f"https://id.twitch.tv/oauth2/authorize?response_type=token&client_id={os.environ['CLIENT_ID']}&redirect_uri={os.environ['REDIRECT_URI']}&scope=chat%3Aread"
    )


if __name__ == "__main__":
    main()
