defmodule Social.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :name, :string
      add :password, :string
      add :password_salt, :text
      add :email, :string
      add :bio, :string
      add :location, :string
      add :website, :string
      add :birthday, :string
      add :profile_picture, :string
      add :banner, :string
      add :theme_color, :string
      add :settings, :text
      add :following, :text
      add :followers, :text
      add :likes, :text
      add :lists, :text

      timestamps()
    end

    create unique_index(:users, [:username])
    create unique_index(:users, [:email])

  end
end
