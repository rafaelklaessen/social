defmodule Social.Router do
  use Social.Web, :router

  pipeline :browser do
    plug :accepts, ["html", "json"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  # Page
  scope "/", Social do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/hashtag/:hashtag", HashtagController, :show
  end

  # Users
  scope "/users", Social do
    pipe_through :browser

    resources "/", UserController, except: [:edit]
    get "/:id/with_replies", UserController, :show_with_replies
    get "/:id/media", UserController, :show_media
    get "/:id/following", UserController, :show_following
    get "/:id/followers", UserController, :show_followers
    get "/:id/likes", UserController, :show_likes
    get "/:id/followers_you_know", UserController,:show_followers_you_know
  end

  # List
  scope "/users/:username", Social do
    pipe_through :browser

    resources "/lists", ListController
    get "/:list_name/", ListController, :redirect_list
  end

  # Status
  scope "/users", Social do
    pipe_through :browser

    get "/:username/status/:id", StatusController, :show
    post "/status/new", StatusController, :create
  end

  scope "/i", Social, as: :i do
    pipe_through :browser

    get "/notifications", PageController, :notifications
    get "/messages", PageController, :messages
  end

  scope "/settings", Social, as: :settings do
    pipe_through :browser

    get "/", SettingsController, :index
    get "/account", SettingsController, :account
    get "/security", SettingsController, :security
    get "/password", SettingsController, :password
    get "/payments", SettingsController, :payments
    get "/orders", SettingsController, :orders
    get "/add_phone", SettingsController, :add_phone
    get "/devices", SettingsController, :devices
    get "/notifications", SettingsController, :notifications
    get "/notifications_timeline", SettingsController, :notifications_timeline
    get "/web_notifications", SettignsController, :web_notifications
    get "/muted_following", SettingsController, :muted_following
    get "/blocked", SettingsController, :blocked
    get "/applications", SettingsController, :applications
    get "/widgets", SettingsController, :widgets
    get "/your_social_data", SettingsController, :your_social_data
    get "/accessibility", SettingsController, :accessibility
  end

  # Other scopes may use custom stacks.
  # scope "/api", Social do
  #   pipe_through :api
  # end
end
