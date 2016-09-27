defmodule Social.ListController do
  use Social.Web, :controller

  plug :put_profile_layout, "user.html"

  def index(conn, %{"username" => username}) do
    conn
    |> assign(:page_title, "Lorem (@#{username}) | Social")
    |> assign(:username, username)
    |> render("lists.html")
  end

  def edit(conn, %{"username" => username, "id" => list_name}) do
    conn
    |> assign(:page_title, "Edit list #{list_name}")
    |> assign(:username, username)
    |> assign(:list_name, list_name)
    |> render("edit.html")
  end

  def new(conn, %{"username" => username}) do
    conn
    |> assign(:page_title, "Create a new list on Social")
    |> assign(:username, username)
    |> render("new.html")
  end

  def show(conn, %{"username" => username, "id" => list_name}) do
    conn
    |> assign(:page_title, "#{username}/#{list_name} on Social")
    |> assign(:username, username)
    |> assign(:list_name, list_name)
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

  def redirect_list(conn, %{"username" => username, "list_name" => list_name}) do
    redirect conn, to: "/users/#{username}/lists/#{list_name}"
  end

  defp put_profile_layout(conn, layout_file) do
    put_layout conn, layout_file
  end
end
