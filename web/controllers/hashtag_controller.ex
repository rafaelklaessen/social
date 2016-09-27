defmodule Social.HashtagController do
  use Social.Web, :controller

  def show(conn, %{"hashtag" => hashtag}) do
    conn
    |> assign(:page_title, "##{hashtag} on Social")
    |> assign(:hashtag, hashtag)
    |> render("show.html")
  end
end
