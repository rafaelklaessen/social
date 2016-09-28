defmodule Social.UserController do
  use Social.Web, :controller

  alias Social.User

  plug :put_profile_layout, "user.html"

  def index(conn, _params) do
    redirect conn, to: "/"
  end

  def edit(conn, %{"id" => username}) do
    user = Repo.get!(User, username)
    changeset = User.changeset(user)
    conn
    |> assign(:page_title, "Edit user #{username}")
    |> assign(:changeset, changeset)
    |> render("edit.html")
  end

  def new(conn, _params) do
    changeset = User.changeset(%User{})
    conn
    |> put_layout("app.html")
    |> assign(:page_title, "New user")
    |> assign(:changeset, changeset)
    |> render("new.html")
  end

  def show(conn, %{"id" => username}) do
    query = from u in User,
            where: u.username == ^username,
            select: %{:name => u.name, :bio => u.bio, :location => u.location, :website => u.website, :birthday => u.birthday, :profile_picture => u.profile_picture, :banner => u.banner, :theme_color => u.theme_color, :settings => u.settings, :following => u.following, :followers => u.followers, :likes => u.likes, :lists => u.lists, :created_at => u.inserted_at}
    data = Repo.all(query)
    # The map is being put in a list, so get it out of the list
    data = hd data
    conn
    |> assign(:page_title, "Lorem (#{username}) | Social")
    |> assign(:username, username)
    |> assign(:data, data)
    |> render("show.html")
  end

  def create(conn, %{"user" => user_params}) do
    changeset = User.changeset(%User{}, user_params)

    case Repo.insert(changeset) do
      {:ok, _user} ->
        conn
        |> put_flash(:info, "User created successfully.")
        |> assign(:page_title, "Yo")
        |> redirect(to: user_path(conn, :index))
      {:error, changeset} ->
        render(conn, "new.html", changeset: changeset, page_title: "kill", username: "kaas")
    end
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Repo.get!(User, id)
    changeset = User.changeset(user, user_params)

    case Repo.update(changeset) do
      {:ok, user} ->
        conn
        |> put_flash(:info, "User updated successfully.")
        |> redirect(to: user_path(conn, :show, user))
      {:error, changeset} ->
        render(conn, "edit.html", user: user, changeset: changeset, page_title: "kees")
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Repo.get!(User, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(user)

    conn
    |> put_flash(:info, "User deleted successfully.")
    |> assign(:page_title, "kees")
    |> redirect(to: user_path(conn, :index))
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
