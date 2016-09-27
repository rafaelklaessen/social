defmodule Social.UserController do
  use Social.Web, :controller

  plug :put_profile_layout, "user.html"

  def index(conn, _params) do
    redirect conn, to: "/"
  end

  def edit(conn, %{"id" => username}) do
    conn
    |> assign(:page_title, username)
    |> render("edit.html")
  end

  def new(conn, _params) do
    conn
    |> assign(:page_title, "New user")
    |> render("new.html")
  end

  def show(conn, %{"id" => username}) do
    conn
    |> assign(:page_title, username)
    |> assign(:name, username)
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

  defp put_profile_layout(conn, layout_file) do
    put_layout conn, layout_file
  end
end
