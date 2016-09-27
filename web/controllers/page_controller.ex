defmodule Social.PageController do
  use Social.Web, :controller

  def index(conn, _params) do
    logged_in = false
    if logged_in do
      conn
      |> assign(:page_title, "Social")
      |> render("timeline.html")
    else
      conn
      |> put_layout("home.html")
      |> assign(:page_title, "Social")
      |> render("index.html")
    end
  end

  def notifications(conn, _params) do
    conn
    |> assign(:page_title, "Social / Notifications")
    |> render("notifications.html")
  end

  def messages(conn, _params) do
    conn
    |> assign(:page_title, "Social / Messages")
    |> render("messages.html")
  end
end
