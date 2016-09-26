# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :social,
  ecto_repos: [Social.Repo]

# Configures the endpoint
config :social, Social.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "7nAjDntZ1CZLi/p3r+5bQIYuOl6B45TGDfZo6FYFhhKwR+8l1G2Zkv03sRmznJja",
  render_errors: [view: Social.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Social.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
