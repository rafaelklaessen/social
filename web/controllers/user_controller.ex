defmodule Social.UserController do
  use Social.Web, :controller

  plug :put_profile_layout, "user.html"

  def index(conn, _params) do
    redirect conn, to: "/"
  end

  def edit(conn, %{"id" => username}) do
    conn
    |> assign(:page_title, "Edit user #{username}")
    |> render("edit.html")
  end

  def new(conn, _params) do
    conn
    |> assign(:page_title, "New user")
    |> render("new.html")
  end

  def show(conn, %{"id" => username}) do
    conn
    |> assign(:page_title, "Lorem (#{username}) | Social")
    |> assign(:username, username)
    |> render("show.html")
  end

  def create(conn, _params) do
    # Create user in database
    redirect conn, to: "/"
  end

  def update(conn, _params) do
    # Update user in database
    redirect conn, to: "/"
  end

  def delete(conn, _params) do
    # Delete user from database
    redirect conn, to: "/"
  end

  def show_with_replies(conn, %{"id" => username}) do
    conn
    |> assign(:page_title, "Tweets with replies by Lorem (#{username}) | Social")
    |> assign(:username, username)
    |> render("show_with_replies.html")
  end

  def show_media(conn, %{"id" => username}) do
    conn
    |> assign(:page_title, "Media Tweets by Lorem (#{username}) | Social")
    |> assign(:username, username)
    |> render("show_media.html")
  end

  def show_following(conn, %{"id" => username}) do
    conn
    |> assign(:page_title, "People followed by Lorem (#{username}) | Social")
    |> assign(:username, username)
    |> render("show_following.html")
  end

  def show_followers(conn, %{"id" => username}) do
    conn
    |> assign(:page_title, "People following Lorem (#{username}) | Social")
    |> assign(:username, username)
    |> render("show_followers.html")
  end

  def show_likes(conn, %{"id" => username}) do
    conn
    |> assign(:page_title, "Tweets liked by Lorem (#{username}) | Social")
    |> assign(:username, username)
    |> render("show_likes.html")
  end

  def show_followers_you_know(conn, %{"id" => username}) do
    conn
    |> assign(:page_title, "People you follow, following Lorem (#{username}) | Social")
    |> assign(:username, username)
    |> render("show_followers_you_know.html")
  end

  defp put_profile_layout(conn, layout_file) do
    put_layout conn, layout_file
  end
end
